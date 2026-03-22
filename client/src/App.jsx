import { useState, useEffect } from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f4f8',
    margin: 0,
    padding: '2rem',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '2.5rem 3rem',
    textAlign: 'center',
    maxWidth: '480px',
    width: '100%',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.3rem 0.8rem',
    borderRadius: '999px',
    marginBottom: '1.2rem',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 1.5rem 0',
  },
  messageBox: {
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    fontSize: '1.15rem',
    color: '#2d3748',
    minHeight: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    color: '#718096',
    fontStyle: 'italic',
    fontSize: '1rem',
  },
  error: {
    color: '#c53030',
    fontSize: '0.95rem',
  },
  footer: {
    marginTop: '1.8rem',
    fontSize: '0.8rem',
    color: '#a0aec0',
  },
  stack: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  tag: {
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    borderRadius: '4px',
    padding: '0.15rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  retryBtn: {
    marginTop: '1rem',
    padding: '0.45rem 1.2rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#4a5568',
  },
};

export default function App() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/hello');
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setError(err.message || 'Failed to fetch message from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>MERN Stack</div>
        <h1 style={styles.title}>Hello World App</h1>

        <div style={styles.messageBox}>
          {loading && <span style={styles.loading}>Fetching message...</span>}
          {error && (
            <span style={styles.error}>Error: {error}</span>
          )}
          {!loading && !error && message && <span>{message}</span>}
        </div>

        {error && (
          <button style={styles.retryBtn} onClick={fetchMessage}>
            Retry
          </button>
        )}

        <div style={styles.footer}>
          <p style={{ margin: '0 0 0.4rem 0' }}>Powered by</p>
          <div style={styles.stack}>
            <span style={styles.tag}>MongoDB</span>
            <span style={styles.tag}>Express</span>
            <span style={styles.tag}>React</span>
            <span style={styles.tag}>Node.js</span>
            <span style={styles.tag}>Vite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
