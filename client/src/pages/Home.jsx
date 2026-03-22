import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { styles, bannerColors } from './Home.styles';

const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

function ConcertCard({ concert, index, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={{ ...styles.cardImage, background: bannerColors[index % bannerColors.length] }}>
        {concert.emoji}
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardInfo}>
          <div style={styles.cardTitle}>{concert.title}</div>
          <div style={styles.cardMeta}>
            📅 {concert.date}<br />
            📍 {concert.venue}
          </div>
        </div>
        <div style={styles.cardPrice}>{concert.price}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: concerts = [], isLoading } = useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
  });

  const results = concerts.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.venue.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const displayed = submitted || query ? results : concerts;

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.logo}>TicketFlow</div>
        <button style={styles.createBtn} onClick={() => navigate('/create')}>
          🎤 Create Event
        </button>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find your next<br />live experience.</h1>
        <p style={styles.heroSub}>Search concerts by name or venue.</p>

        <form style={styles.searchWrap} onSubmit={handleSearch}>
          <input
            style={styles.searchInput}
            placeholder="Artist, concert name, or venue..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
            autoFocus
          />
          <button style={styles.searchBtn} type="submit">Search</button>
        </form>
      </div>

      <div style={styles.results}>
        {isLoading && <div style={styles.empty}>Loading concerts...</div>}

        {!isLoading && (submitted || query) && (
          <div style={styles.resultsLabel}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </div>
        )}

        {!isLoading && (submitted || query) && results.length === 0 ? (
          <div style={styles.empty}>No concerts found.</div>
        ) : (
          <div style={styles.grid}>
            {displayed.map((concert, i) => (
              <ConcertCard
                key={concert._id || concert.title}
                concert={concert}
                index={i}
                onClick={() => navigate('/buy')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
