import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { styles } from './Auth.styles';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div
        className="glow-blob-pink"
        style={{ width: '400px', height: '300px', top: '-80px', left: '50%', transform: 'translateX(-50%)' }}
      />
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>{isLogin ? 'Welcome Back' : 'Join Us'}</p>
          <h1 style={styles.heading}>
            {isLogin ? 'Sign in to' : 'Create your'}{' '}
            <span className="gradient-text">{isLogin ? 'your account' : 'account'}</span>
          </h1>
          <p style={styles.sub}>
            {isLogin ? 'Access your tickets and orders.' : 'Start buying tickets in seconds.'}
          </p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p style={{ color: '#ff6b6b', fontSize: '14px', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>
        </div>

        <p style={styles.toggleHint}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            style={styles.toggleLink}
            onClick={() => { setMode(isLogin ? 'register' : 'login'); setError(''); }}
          >
            {isLogin ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}