import { useState } from 'react';

// TODO: import styles once designed
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
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleSubmit}>
        {/* TODO: add relevant fields for login or register */}
        {/* TODO: add submit button */}
        {/* TODO: add validation and error messages */}
      </form>

      <button onClick={() => setMode(isLogin ? 'register' : 'login')}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>

      {/* TODO: add forgot password link */}
      {/* TODO: add OAuth buttons (Google, etc.) if needed */}
    </div>
  );
}
