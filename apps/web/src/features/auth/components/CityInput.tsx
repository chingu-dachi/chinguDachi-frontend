import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui';

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CityInput({ value, onChange }: CityInputProps) {
  const { t } = useTranslation('auth');

  return (
    <Input
      label={t('city')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('cityPlaceholder')}
      maxLength={20}
      counter={{ current: value.length, max: 20 }}
    />
  );
}
