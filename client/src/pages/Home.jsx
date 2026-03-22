import { useNavigate } from 'react-router-dom';
import { styles } from './Home.styles';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.logo}>TicketFlow</div>
      <p style={styles.subtitle}>What would you like to do?</p>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🎟️</div>
          <div style={styles.cardTitle}>Buy Tickets</div>
          <div style={styles.cardDesc}>Browse upcoming concerts and grab your seat.</div>
          <button style={styles.cardBtnBuy} onClick={() => navigate('/buy')}>Browse Events</button>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🎤</div>
          <div style={styles.cardTitle}>Create a Concert</div>
          <div style={styles.cardDesc}>Set up your event and start selling tickets.</div>
          <button style={styles.cardBtnCreate} onClick={() => navigate('/create')}>Create Event</button>
        </div>
      </div>
    </div>
  );
}
