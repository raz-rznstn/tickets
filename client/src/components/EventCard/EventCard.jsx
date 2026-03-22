import { styles } from './EventCard.styles';

export default function EventCard({ event }) {
  return (
    <div style={styles.card} className="card-hover card-hover-cyan">
      <div style={styles.banner}>
        <div style={styles.bannerOverlay} />
        <span style={styles.bannerEmoji}>{event.emoji}</span>
      </div>
      <div style={styles.body}>
        <div style={styles.title}>{event.title}</div>
        <div style={styles.meta}>
          📅 {event.date}<br />
          📍 {event.venue}
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>{event.price}</span>
          <button style={styles.buyBtn} className="btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
