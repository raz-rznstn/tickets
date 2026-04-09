import { useNavigate, useLocation } from 'react-router-dom';
import { styles } from './Navbar.styles';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <span style={styles.logoPrimary}>Ticket</span>
          <span style={styles.logoSecondary}>Flow</span>
        </div>
        <div style={styles.links}>
          <button style={{ ...styles.link, ...(pathname === '/admin' ? styles.linkActive : {}) }} onClick={() => navigate('/admin')}>
            Concert List
          </button>
          <button style={{ ...styles.link, ...(pathname === '/validator' ? styles.linkActive : {}) }} onClick={() => navigate('/validator')}>
            Validator
          </button>
        </div>
      </nav>
      {pathname !== '/' && (
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
      )}
    </div>
  );
}
