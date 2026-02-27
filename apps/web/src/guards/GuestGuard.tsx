import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@chingu-dachi/store';

export function GuestGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
