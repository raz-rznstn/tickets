import { useParams, useNavigate } from 'react-router-dom';
import { styles } from './ConcertDetails.styles';
import Navbar from '../../components/Navbar/Navbar';
import { useGetConcert } from '../../services/api/hooks/useConcert';

export default function ConcertDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: concert, isLoading, error } = useGetConcert(id);

  if (isLoading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#4A4A6A' }} className="loading-pulse">
          Loading concert...
        </div>
      </div>
    );
  }

  if (error || !concert) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#4A4A6A' }}>
          Concert not found. <button onClick={() => navigate('/')} style={{ color: '#FF2E63', background: 'none', border: 'none', cursor: 'pointer' }}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      {/* Hero image */}
      <div style={styles.heroWrap}>
        <img src={concert.imageUrl} alt={concert.title} style={styles.heroImage} />
        <div style={styles.heroOverlay} />
        <button style={styles.backBtn} className="btn-outline-muted" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span style={styles.heroBadge}>🎟️ On Sale</span>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.title}>{concert.title}</h1>

        {/* Meta chips */}
        <div style={styles.metaRow}>
          <div style={styles.metaChip}>
            <span style={styles.metaChipIcon}>📅</span>
            {concert.date}
          </div>
          <div style={styles.metaChip}>
            <span style={styles.metaChipIcon}>📍</span>
            {concert.venue}
          </div>
          <div style={styles.metaChip}>
            <span style={styles.metaChipIcon}>🎫</span>
            Starting from {concert.price}
          </div>
          <div style={styles.metaChip}>
            <span style={styles.metaChipIcon}>⏰</span>
            Doors open at 7:00 PM
          </div>
        </div>

        <div style={styles.divider} />

        {/* About */}
        <div style={styles.sectionLabel}>About This Event</div>
        <p style={styles.aboutText}>
          Experience an unforgettable night at <strong style={{ color: '#EAEAEA' }}>{concert.title}</strong> —
          one of the most anticipated live events of 2026. Held at the legendary <strong style={{ color: '#EAEAEA' }}>{concert.venue}</strong>,
          this show promises world-class performances, stunning stage production, and an electric atmosphere
          you won't find anywhere else. Whether you're a longtime fan or discovering the act for the first time,
          this is a night you'll be talking about for years.
        </p>

        {/* Highlights */}
        <div style={styles.sectionLabel}>Event Highlights</div>
        <div style={styles.highlights}>
          {[
            { icon: '🎵', label: 'Genre', value: 'Live Music' },
            { icon: '🏟️', label: 'Capacity', value: '15,000+' },
            { icon: '⭐', label: 'Rating', value: '4.9 / 5' },
            { icon: '🌍', label: 'Language', value: 'English' },
            { icon: '🎭', label: 'Age Limit', value: '16+' },
            { icon: '📸', label: 'Photography', value: 'Allowed' },
          ].map((h) => (
            <div key={h.label} style={styles.highlightCard}>
              <div style={styles.highlightIcon}>{h.icon}</div>
              <div style={styles.highlightLabel}>{h.label}</div>
              <div style={styles.highlightValue}>{h.value}</div>
            </div>
          ))}
        </div>

        <div style={styles.divider} />

        {/* Buy section */}
        <div style={styles.buySection}>
          <div style={styles.priceBlock}>
            <div style={styles.priceLabel}>Ticket Price</div>
            <div style={styles.priceValue}>{concert.price}</div>
            <div style={styles.priceNote}>per person · includes all fees</div>
          </div>
          <button style={styles.buyBtn} className="btn-primary" onClick={() => navigate(`/buy/${id}`)}>
            🎟️ Buy Ticket Now
          </button>
        </div>
      </div>
    </div>
  );
}
