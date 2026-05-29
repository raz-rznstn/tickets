import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { styles } from './Navbar.styles';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isAuthenticated, isAdmin, isValidator, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <span style={styles.logoPrimary}>Ticket</span>
          <span style={styles.logoSecondary}>Flow</span>
        </div>

        <div style={styles.links}>
          {isAdmin && (
            <button
              style={{ ...styles.link, ...(pathname === '/admin' ? styles.linkActive : {}) }}
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </button>
          )}

          {isValidator && (
            <button
              style={{ ...styles.link, ...(pathname === '/validator' ? styles.linkActive : {}) }}
              onClick={() => navigate('/validator')}
            >
              Validator
            </button>
          )}

          {isAuthenticated && !isValidator && !isAdmin && (
            <button
              style={{ ...styles.link, ...(pathname === '/my-orders' ? styles.linkActive : {}) }}
              onClick={() => navigate('/my-orders')}
            >
              My Orders
            </button>
          )}

          {isAuthenticated ? (
            <>
              <span style={styles.username}>{user.name}</span>
              <button style={styles.link} onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <button
              style={{ ...styles.link, ...(pathname === '/auth' ? styles.linkActive : {}) }}
              onClick={() => navigate('/auth')}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {pathname !== '/' && (
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          Back
        </button>
      )}
    </div>
  );
}