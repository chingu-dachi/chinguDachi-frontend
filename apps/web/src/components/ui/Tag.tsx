import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const tagVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700',
        selectable:
          'cursor-pointer border border-gray-300 text-gray-600 hover:border-primary hover:text-primary',
        selected: 'border border-primary bg-primary/10 text-primary',
        filter: 'bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TagProps extends VariantProps<typeof tagVariants> {
  label: string;
  className?: string;
  onClick?: () => void;
}

export function Tag({ label, variant, className, onClick }: TagProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(tagVariants({ variant, className }))}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={cn(tagVariants({ variant, className }))}>{label}</span>
  );
}
