import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  // Wait for session check before making any redirect decision
  if (loading) return null;

  if (!user) return <Navigate to="/auth" replace />;

  if (roles && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}