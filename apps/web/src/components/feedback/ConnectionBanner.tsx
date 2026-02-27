import { cn } from '@/lib/cn';

interface ConnectionBannerProps {
  connected: boolean;
}

export function ConnectionBanner({ connected }: ConnectionBannerProps) {
  if (connected) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 bg-danger/10 px-4 py-2 text-caption text-danger',
      )}
      role="alert"
    >
      <span className="h-2 w-2 rounded-full bg-danger" />
      연결이 끊어졌습니다. 재연결 시도 중...
    </div>
  );
}
