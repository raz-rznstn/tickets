import { useState } from 'react';
import { styles } from './Auth.styles';

// TODO: import auth API hooks once implemented
// TODO: decide on auth strategy (JWT, OAuth, etc.)

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const isLogin = mode === 'login';

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call login or register API
  }

  return (
    <div style={styles.page}>
      <div className="glow-blob-pink" style={{ width: '400px', height: '300px', top: '-80px', left: '50%', transform: 'translateX(-50%)' }} />
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
                <input style={styles.input} type="text" placeholder="Jane Smith" required />
              </div>
            )}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} type="email" placeholder="you@example.com" required />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" placeholder="••••••••" required />
            </div>
            {/* TODO: add validation and error messages */}
            <button type="submit" style={styles.submitBtn}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {/* TODO: add OAuth buttons (Google, etc.) if needed */}
        </div>

        <p style={styles.toggleHint}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button style={styles.toggleLink} onClick={() => setMode(isLogin ? 'register' : 'login')}>
            {isLogin ? 'Register' : 'Sign in'}
          </button>
        </p>

        {/* TODO: add forgot password link */}
      </div>
    </div>
  );
}
