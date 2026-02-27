import { useEffect } from 'react';
import { cn } from '@/lib/cn';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

const TOAST_COLORS = {
  success: 'bg-success text-white',
  error: 'bg-danger text-white',
  info: 'bg-gray-800 text-white',
} as const;

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={cn(
        'animate-slide-up rounded-lg px-4 py-3 text-sm shadow-lg',
        TOAST_COLORS[toast.type],
      )}
      role="alert"
    >
      {toast.message}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
