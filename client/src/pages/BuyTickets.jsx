import { useNavigate } from 'react-router-dom';
import { styles } from './BuyTickets.styles';

const events = [
  { id: 1, emoji: '🎸', title: 'Rock Night Live', date: 'Apr 12, 2026', venue: 'Madison Square Garden', price: '$49' },
  { id: 2, emoji: '🎹', title: 'Piano & Soul', date: 'Apr 20, 2026', venue: 'Carnegie Hall', price: '$35' },
  { id: 3, emoji: '🎺', title: 'Jazz Fest 2026', date: 'May 3, 2026', venue: 'Blue Note, NYC', price: '$28' },
  { id: 4, emoji: '🎻', title: 'Symphony Evening', date: 'May 15, 2026', venue: 'Lincoln Center', price: '$60' },
  { id: 5, emoji: '🎤', title: 'Pop Stars Unite', date: 'Jun 1, 2026', venue: 'Barclays Center', price: '$75' },
  { id: 6, emoji: '🥁', title: 'Drum & Bass Night', date: 'Jun 18, 2026', venue: 'Brooklyn Mirage', price: '$40' },
];

export default function BuyTickets() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.back} onClick={() => navigate('/')}>← Back</button>
        <h1 style={styles.title}>🎟️ Upcoming Events</h1>
      </div>

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
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
