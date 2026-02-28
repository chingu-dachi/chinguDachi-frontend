import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, useMe } from '@chingu-dachi/store';
import { Spinner } from '@/components/ui';

export function GuestGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
