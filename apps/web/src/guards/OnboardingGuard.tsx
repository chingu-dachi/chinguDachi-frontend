import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@chingu-dachi/store';

export function OnboardingGuard() {
  const user = useAuthStore((s) => s.user);

  if (user && !user.onboardingRequired) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
