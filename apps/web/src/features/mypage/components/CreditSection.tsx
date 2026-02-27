import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { useToast } from '@/hooks/useToast';

export function CreditSection() {
  const { t } = useTranslation('profile');
  const { toast } = useToast();

  return (
    <div className="mx-4 rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl text-credit">⚡</span>
          <span className="font-semibold">Unlimited</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast('info', t('creditComingSoon'))}
        >
          {t('chargeCredits')}
        </Button>
      </div>
      <p className="mt-2 text-caption text-gray-400">{t('freeBeta')}</p>
    </div>
  );
}
