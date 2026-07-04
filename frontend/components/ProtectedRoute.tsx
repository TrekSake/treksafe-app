import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  role?: 'senderista' | 'rescatista';
};

export function ProtectedRoute({ children, role }: Props) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'rescatista' ? '/rescatista' : '/senderista'} replace />;
  }

  return children;
}
