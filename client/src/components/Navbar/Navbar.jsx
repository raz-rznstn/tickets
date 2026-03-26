import { useNavigate, useLocation } from 'react-router-dom';
import { styles } from './Navbar.styles';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoPrimary}>Ticket</span>
        <span style={styles.logoSecondary}>Flow</span>
      </div>
      {pathname !== '/create' && (
        <button
          style={styles.createBtn}
          className="btn-outline-cyan"
          onClick={() => navigate('/create')}
        >
          🎤 Create Event
        </button>
      )}
    </nav>
  );
}
