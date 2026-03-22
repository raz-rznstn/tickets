import { useNavigate } from 'react-router-dom';
import { styles } from './Navbar.styles';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>TicketFlow</div>
      <button style={styles.createBtn} onClick={() => navigate('/create')}>
        🎤 Create Event
      </button>
    </nav>
  );
}
