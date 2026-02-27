import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

interface BioInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BioInput({ value, onChange }: BioInputProps) {
  const { t } = useTranslation('auth');

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="bio" className="text-sm font-medium text-gray-700">
        {t('bio')}
      </label>
      <textarea
        id="bio"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('bioPlaceholder')}
        maxLength={50}
        rows={2}
        className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-body outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <p className={cn('self-end text-caption', value.length > 50 ? 'text-danger' : 'text-gray-400')}>
        {value.length}/50
      </p>
    </div>
  );
}
