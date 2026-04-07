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
        {/* TODO: show role-based nav link once auth context is available */}
        {/* admin        → /admin */}
        {/* user         → /my-orders */}
        {/* validator    → /validator */}
        {/* login/logout → /auth */}
      </nav>
      {pathname !== '/' && (
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
      )}
    </div>
  );
}
