import { useTranslation } from 'react-i18next';
import type { Nationality } from '@chingu-dachi/shared';
import { cn } from '@/lib/cn';

interface NationalitySelectorProps {
  value: Nationality | null;
  onChange: (nationality: Nationality) => void;
}

const OPTIONS: { value: Nationality; flag: string; ko: string; ja: string }[] = [
  { value: 'KR', flag: '🇰🇷', ko: '한국', ja: '韓国' },
  { value: 'JP', flag: '🇯🇵', ko: '日本', ja: '日本' },
];

export function NationalitySelector({ value, onChange }: NationalitySelectorProps) {
  const { i18n } = useTranslation();

  function handleSelect(nationality: Nationality) {
    onChange(nationality);
    // 국적 선택 즉시 i18n 언어 전환
    const lang = nationality === 'KR' ? 'ko' : 'ja';
    i18n.changeLanguage(lang);
  }

  return (
    <div className="flex gap-3">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-4 text-body font-medium transition-colors',
            value === option.value
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-gray-200 text-gray-600 hover:border-gray-300',
          )}
          aria-pressed={value === option.value}
        >
          <span className="text-2xl">{option.flag}</span>
          <span>
            {option.ko} / {option.ja}
          </span>
        </button>
      ))}
    </div>
  );
}
