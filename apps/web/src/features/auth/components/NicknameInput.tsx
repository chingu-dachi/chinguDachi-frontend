import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCheckNickname } from '@chingu-dachi/store';
import { Input } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';

const NICKNAME_DEBOUNCE_MS = 300;
const MIN_LENGTH = 2;
const MAX_LENGTH = 12;

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
  const debouncedNickname = useDebounce(value.trim(), NICKNAME_DEBOUNCE_MS);
  const { data, isFetching } = useCheckNickname(debouncedNickname);

  const isLengthValid = value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;
  const isAvailable = data?.success && data.data.available;
  const isTaken = data?.success && !data.data.available;
  const isValid = isLengthValid && isAvailable === true && !isFetching;
  const onValidationRef = useRef(onValidation);
  onValidationRef.current = onValidation;

  useEffect(() => {
    onValidationRef.current?.(isValid);
  }, [isValid]);

  function getCheckResult(): { error?: string; success?: string } {
    if (externalError) return { error: externalError };
    if (!isLengthValid || isFetching) return {};
    if (debouncedNickname !== value.trim()) return {};
    if (isTaken) return { error: t('nicknameTaken') };
    if (isAvailable) return { success: t('nicknameAvailable') };
    return {};
  }

  const { error, success } = getCheckResult();

  return (
    <Input
      label={t('nickname')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('nicknamePlaceholder')}
      maxLength={MAX_LENGTH}
      error={error}
      success={success}
      counter={{ current: value.length, max: MAX_LENGTH }}
    />
  );
}
