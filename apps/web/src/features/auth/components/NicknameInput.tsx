import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui';

interface NicknameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onValidation?: (isValid: boolean) => void;
}

export function NicknameInput({
  value,
  onChange,
  error: externalError,
  onValidation,
}: NicknameInputProps) {
  const { t } = useTranslation('auth');
  const [checkResult, setCheckResult] = useState<string | undefined>();

  // 디바운스 중복 체크 (MVP: 클라이언트 검증만, 서버 연동은 api 연결 시)
  useEffect(() => {
    if (value.length < 2) {
      setCheckResult(undefined);
      onValidation?.(false);
      return;
    }

    const timer = setTimeout(() => {
      // TODO: useCheckNickname API 연동
      setCheckResult(undefined);
      onValidation?.(value.length >= 2 && value.length <= 12);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onValidation]);

  return (
    <Input
      label={t('nickname')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('nicknamePlaceholder')}
      maxLength={12}
      error={externalError ?? checkResult}
      counter={{ current: value.length, max: 12 }}
    />
  );
}
