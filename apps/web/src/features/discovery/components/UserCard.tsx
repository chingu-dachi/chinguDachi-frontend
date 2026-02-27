import type { User } from '@chingu-dachi/shared';
import { Avatar, Tag } from '@/components/ui';
import { useNationalityFlag } from '@/hooks/useNationalityFlag';
import { calculateAge } from '@/lib/age';
import { getInterestLabel } from '@/lib/interest-tags';
import { useTranslation } from 'react-i18next';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  const flag = useNationalityFlag(user.nationality);
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ja' ? 'ja' : 'ko';
  const age = calculateAge(user.birthYear);
  const displayTags = user.interests.slice(0, 3);

  return (
    <button
      type="button"
      onClick={() => onClick(user)}
      className="flex w-full gap-3 rounded-xl border border-gray-100 p-4 text-left transition-colors hover:bg-gray-50"
    >
      <Avatar src={user.profileImageUrl} alt={user.nickname} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">{user.nickname}</span>
          <span>{flag}</span>
          <span className="text-caption text-gray-400">{age}세</span>
        </div>
        {displayTags.length > 0 && (
          <div className="flex gap-1">
            {displayTags.map((tagId) => (
              <Tag
                key={tagId}
                label={getInterestLabel(tagId, lang)}
                variant="default"
              />
            ))}
          </div>
        )}
        {user.bio && (
          <p className="truncate text-sm text-gray-500">{user.bio}</p>
        )}
      </div>
    </button>
  );
}
