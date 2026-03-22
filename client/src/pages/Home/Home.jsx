import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { styles } from './Home.styles';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import ConcertCard from '../../components/ConcertCard/ConcertCard';

const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

const stats = [
  { number: '500+', label: 'Live Events' },
  { number: '50K+', label: 'Tickets Sold' },
  { number: '120+', label: 'Venues' },
  { number: '200+', label: 'Artists' },
];

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

  const displayed = submitted || query ? results : concerts;

  return (
    <div style={styles.page}>
      <Navbar />

      {/* Hero */}
      <section style={styles.heroSection}>
        {/* Ambient glow blobs */}
        <div className="glow-blob-pink" style={{ width: '600px', height: '400px', top: '-100px', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="glow-blob-cyan" style={{ width: '400px', height: '300px', top: '50px', left: '50%', transform: 'translateX(-50%)' }} />

        <div style={styles.heroEyebrow}>
          <span style={styles.eyebrowLine} />
          Exclusive Live Experiences
          <span style={styles.eyebrowLine} />
        </div>

        <h1 style={styles.heroTitle}>
          Your next<br />
          <span className="gradient-text">live experience</span>
          <br />awaits.
        </h1>

        <p style={styles.heroSub}>Search by artist · concert · venue</p>

        <SearchBar
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        />
      </section>

      {/* Stats */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={s.label} style={i < stats.length - 1 ? styles.statItem : styles.statItemLast}>
              <span style={styles.statNumber} className="gradient-text-stats">{s.number}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={styles.divider}>
        <span style={styles.dividerLine} />
        <span style={styles.dividerDots}>◆ ◆ ◆</span>
        <span style={styles.dividerLine} />
      </div>

      {/* Section label */}
      <div style={styles.sectionHeader}>
        <span style={styles.sectionLabel}>
          {submitted || query ? 'Search Results' : 'Featured Events'}
        </span>
        <span style={styles.sectionLine} />
        {(submitted || query) && (
          <span style={styles.resultCount}>
            {results.length} result{results.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Listings */}
      <section style={styles.listSection}>
        {isLoading && <div style={styles.empty} className="loading-pulse">Loading events...</div>}
        {!isLoading && (submitted || query) && results.length === 0 && (
          <div style={styles.empty}>No concerts found for "{query}"</div>
        )}
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
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>
          <span style={{ color: '#FF2E63' }}>Ticket</span>
          <span style={{ color: '#08D9D6' }}>Flow</span>
        </span>
        <span style={styles.footerCopy}>© 2026 · All rights reserved</span>
      </footer>
    </div>
  );
}
