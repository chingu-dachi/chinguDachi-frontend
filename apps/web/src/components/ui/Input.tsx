import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  counter?: { current: number; max: number };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, label, error, success, counter, id, ...props }, ref) {
    const inputId = id ?? label?.replace(/\s/g, '-').toLowerCase();

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 rounded-lg border px-3 text-body outline-none transition-colors',
            'placeholder:text-gray-400',
            'focus:border-primary focus:ring-1 focus:ring-primary',
            error
              ? 'border-danger focus:border-danger focus:ring-danger'
              : success
                ? 'border-success focus:border-success focus:ring-success'
                : 'border-gray-300',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p id={`${inputId}-error`} className="text-caption text-danger" role="alert">
              {error}
            </p>
          ) : success ? (
            <p className="text-caption text-success">
              {success}
            </p>
          ) : null}
          {counter && (
            <p className={cn('ml-auto text-caption', counter.current > counter.max ? 'text-danger' : 'text-gray-400')}>
              {counter.current}/{counter.max}
            </p>
          )}
        </div>
      </div>
    );
  },
);
