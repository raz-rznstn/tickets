import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { styles } from './BuyTickets.styles';

const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export default function BuyTickets() {
  const navigate = useNavigate();
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.back} onClick={() => navigate('/')}>← Back</button>
        <h1 style={styles.title}>🎟️ Upcoming Events</h1>
      </div>

      {isLoading && <p>Loading events...</p>}
      {error && <p>Error: {error.message}</p>}

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event._id} style={styles.card}>
            <div style={styles.cardBanner}>{event.emoji}</div>
            <div style={styles.cardBody}>
              <div style={styles.cardTitle}>{event.title}</div>
              <div style={styles.cardMeta}>
                📅 {event.date}<br />
                📍 {event.venue}
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.price}>{event.price}</span>
                <button style={styles.buyBtn}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
