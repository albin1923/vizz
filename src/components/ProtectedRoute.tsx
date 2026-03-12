import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
  requiredPermission?: string;
}

export default function ProtectedRoute({ children, requiredPermission }: Props) {
  const { user, hasPermission } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (requiredPermission && !hasPermission(requiredPermission))
    return <Navigate to="/" replace />;

  return <>{children}</>;
}
