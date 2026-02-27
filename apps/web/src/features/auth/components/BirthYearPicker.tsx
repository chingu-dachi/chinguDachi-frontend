import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from '@/components/overlay';

interface BirthYearPickerProps {
  value: number | null;
  onChange: (year: number) => void;
}

export function BirthYearPicker({ value, onChange }: BirthYearPickerProps) {
  const { t } = useTranslation('auth');
  const [open, setOpen] = useState(false);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 80;
    const maxYear = currentYear - 14;
    const result: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      result.push(y);
    }
    return result;
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t('birthYear')}
        </label>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 items-center rounded-lg border border-gray-300 px-3 text-body transition-colors hover:border-gray-400"
        >
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value ? `${value}년` : t('birthYearPlaceholder')}
          </span>
        </button>
      </div>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={t('birthYear')}
      >
        <div className="max-h-64 overflow-y-auto">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => {
                onChange(year);
                setOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-body transition-colors hover:bg-gray-50 ${
                value === year ? 'font-semibold text-primary' : 'text-gray-700'
              }`}
            >
              {year}년
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
