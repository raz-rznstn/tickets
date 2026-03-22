import { styles } from './EventCard.styles';

export default function EventCard({ event }) {
  return (
    <div style={styles.card}>
      <div style={styles.banner}>{event.emoji}</div>
      <div style={styles.body}>
        <div style={styles.title}>{event.title}</div>
        <div style={styles.meta}>
          📅 {event.date}<br />
          📍 {event.venue}
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>{event.price}</span>
          <button style={styles.buyBtn}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
