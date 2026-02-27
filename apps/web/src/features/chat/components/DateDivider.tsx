import { formatRelativeDate } from '@chingu-dachi/shared';

interface DateDividerProps {
  date: string;
}

export function DateDivider({ date }: DateDividerProps) {
  return (
    <div className="flex items-center justify-center py-3">
      <span className="rounded-full bg-gray-100 px-3 py-1 text-caption text-gray-500">
        {formatRelativeDate(date)}
      </span>
    </div>
  );
}
