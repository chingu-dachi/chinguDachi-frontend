import { useTranslation } from 'react-i18next';
import type { User } from '@chingu-dachi/shared';
import { INTEREST_TAGS } from '@chingu-dachi/shared';
import { BottomSheet } from '@/components/overlay';
import { Avatar, Button, Tag } from '@/components/ui';
import { useNationalityFlag } from '@/hooks/useNationalityFlag';
import { calculateAge } from '@/lib/age';

interface UserProfilePopupProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onStartChat: (userId: string) => void;
  loading?: boolean;
}

export function UserProfilePopup({
  user,
  open,
  onClose,
  onStartChat,
  loading,
}: UserProfilePopupProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'ja' ? 'ja' : 'ko';

  if (!user) return null;

  const flag = useNationalityFlag(user.nationality);
  const age = calculateAge(user.birthYear);

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <Avatar src={user.profileImageUrl} alt={user.nickname} size="xl" />
        <div className="flex items-center gap-2">
          <h3 className="text-h2">{user.nickname}</h3>
          <span className="text-xl">{flag}</span>
          <span className="text-sm text-gray-400">{age}세</span>
        </div>

        {user.city && (
          <p className="text-sm text-gray-500">{user.city}</p>
        )}

        {user.bio && (
          <p className="text-center text-body text-gray-600">{user.bio}</p>
        )}

        {user.interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {user.interests.map((tagId) => {
              const tag = INTEREST_TAGS.find((t) => t.id === tagId);
              return tag ? (
                <Tag key={tagId} label={tag[lang]} variant="default" />
              ) : null;
            })}
          </div>
        )}

        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={() => onStartChat(user.userId)}
          className="mt-2"
        >
          {t('chat:startChat')}
        </Button>
      </div>
    </BottomSheet>
  );
}
