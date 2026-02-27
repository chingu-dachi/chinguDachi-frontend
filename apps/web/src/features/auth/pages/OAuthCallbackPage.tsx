import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '@chingu-dachi/store';
import { useAuthStore } from '@chingu-dachi/store';
import { Spinner } from '@/components/ui';

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useLogin();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/', { replace: true });
      return;
    }

    login.mutate(
      { provider: 'google', code },
      {
        onSuccess: (res) => {
          if (res.success) {
            const loggedInUser = res.data.user;
            if (loggedInUser.onboardingRequired) {
              navigate('/onboarding', { replace: true });
            } else {
              navigate('/home', { replace: true });
            }
          } else {
            navigate('/', { replace: true });
          }
        },
        onError: () => {
          navigate('/', { replace: true });
        },
      },
    );
  }, [searchParams, navigate, login, user]);

  return (
    <div className="flex h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}
