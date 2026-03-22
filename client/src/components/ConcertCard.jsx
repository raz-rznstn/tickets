import { styles, bannerColors } from './ConcertCard.styles';

export default function ConcertCard({ concert, index, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={{ ...styles.image, background: bannerColors[index % bannerColors.length] }}>
        {concert.emoji}
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
