import { styles, bannerGradients } from './ConcertCard.styles';

export default function ConcertCard({ concert, index, onClick }) {
  return (
    <div style={styles.card} className="card-hover" onClick={onClick}>
      <div style={{ ...styles.banner, background: bannerGradients[index % bannerGradients.length] }}>
        <div style={styles.bannerOverlay} />
        <span style={styles.emoji}>{concert.emoji}</span>
      </div>
      <div style={styles.body}>
        <div style={styles.info}>
          <div style={styles.title}>{concert.title}</div>
          <div style={styles.meta}>
            📅 {concert.date}<br />
            📍 {concert.venue}
          </div>
        </div>
        <div style={styles.price}>{concert.price}</div>
      </div>
    </div>
  );
}
