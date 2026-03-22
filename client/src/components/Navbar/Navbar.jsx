import { useNavigate } from 'react-router-dom';
import { styles } from './Navbar.styles';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoPrimary}>Ticket</span>
        <span style={styles.logoSecondary}>Flow</span>
      </div>
      <button
        style={styles.createBtn}
        className="btn-outline-cyan"
        onClick={() => navigate('/create')}
      >
        🎤 Create Event
      </button>
    </nav>
  );
}
