import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMe, loginUser, registerUser, logoutUser } from '../services/api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for active session on every page load
  useEffect(() => {
    fetchMe()
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    setUser(data.user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
};

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin:         user?.role === 'admin',
      isScanner:       user?.role === 'scanner',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);