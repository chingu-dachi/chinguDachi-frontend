import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@chingu-dachi/store';
import { Spinner } from '@/components/ui';
import { useMe } from '@chingu-dachi/store';

interface AuthGuardProps {
  requireOnboarding?: boolean;
}

export function AuthGuard({ requireOnboarding = false }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireOnboarding && user?.onboardingRequired) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
