import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '@chingu-dachi/store';
import { Spinner } from '@/components/ui';

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useLogin();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;

    const code = searchParams.get('code');
    if (!code) {
      navigate('/', { replace: true });
      return;
    }

    calledRef.current = true;
    login.mutate(
      { provider: 'google', code },
      {
        onSuccess: (res) => {
          if (res.success && res.data.onboardingRequired) {
            navigate('/onboarding', { replace: true });
          } else if (res.success) {
            navigate('/home', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        },
        onError: () => {
          navigate('/', { replace: true });
        },
      },
    );
  }, [searchParams, navigate, login]);

  return (
    <div className="flex h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}
