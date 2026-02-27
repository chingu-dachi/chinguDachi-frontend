import { useTranslation } from 'react-i18next';
import { INTEREST_TAGS, type InterestTagId } from '@chingu-dachi/shared';
import { Tag } from '@/components/ui';

interface InterestTagSelectorProps {
  selected: InterestTagId[];
  onChange: (tags: InterestTagId[]) => void;
}

export function InterestTagSelector({
  selected,
  onChange,
}: InterestTagSelectorProps) {
  const { t, i18n } = useTranslation('auth');
  const lang = i18n.language === 'ja' ? 'ja' : 'ko';

  function toggleTag(tagId: InterestTagId) {
    if (selected.includes(tagId)) {
      onChange(selected.filter((id) => id !== tagId));
    } else {
      onChange([...selected, tagId]);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {t('interests')}
        <span className="ml-1 text-caption text-gray-400">
          ({selected.length}/15)
        </span>
      </label>
      <div className="flex flex-wrap gap-2">
        {INTEREST_TAGS.map((tag) => (
          <Tag
            key={tag.id}
            label={tag[lang]}
            variant={selected.includes(tag.id) ? 'selected' : 'selectable'}
            onClick={() => toggleTag(tag.id)}
          />
        ))}
      </div>
    </div>
  );
}
