import { styles } from './ConcertCard.styles';

export default function ConcertCard({ concert, onClick }) {
  const isSoldOut = concert.availableSeats === 0;

  return (
    <div style={styles.card} className="card-hover" onClick={onClick}>
      <div style={styles.banner}>
        <img src={concert.imageUrl} alt={concert.title} style={styles.image} />
        <div style={styles.bannerOverlay} />
        {isSoldOut && <div style={styles.soldOutBadge}>Sold Out</div>}
      </div>
      <div style={styles.body}>
        <div style={styles.info}>
          <div style={styles.title}>{concert.title}</div>
          <div style={styles.meta}>
            📅 {concert.date}<br />
            📍 {concert.venue}
          </div>
        </div>
        <div style={isSoldOut ? styles.priceSoldOut : styles.price}>
          {isSoldOut ? 'Sold Out' : concert.price}
        </div>
      </div>
    </div>
  );
}
