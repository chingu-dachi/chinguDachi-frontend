import { useTranslation } from 'react-i18next';
import type { User } from '@chingu-dachi/shared';
import { Avatar, Button } from '@/components/ui';
import { useNationalityFlag } from '@/hooks/useNationalityFlag';

interface ProfileSectionProps {
  user: User;
  onEdit: () => void;
}

export function ProfileSection({ user, onEdit }: ProfileSectionProps) {
  const { t } = useTranslation('profile');
  const flag = useNationalityFlag(user.nationality);

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-6">
      <Avatar src={user.profileImageUrl} alt={user.nickname} size="xl" />
      <div className="flex items-center gap-2">
        <h2 className="text-h2">{user.nickname}</h2>
        <span className="text-xl">{flag}</span>
      </div>
      <Button variant="secondary" size="sm" onClick={onEdit}>
        {t('editProfile')}
      </Button>
    </div>
  );
}
