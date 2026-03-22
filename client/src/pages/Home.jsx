import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { styles } from './Home.styles';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ConcertCard from '../components/ConcertCard';

const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

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
      <Navbar />

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find your next<br />live experience.</h1>
        <p style={styles.heroSub}>Search concerts by name or venue.</p>
        <SearchBar
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
          onSubmit={handleSearch}
        />
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
