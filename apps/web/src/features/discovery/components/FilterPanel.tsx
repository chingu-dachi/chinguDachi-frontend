import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { InterestTagId } from '@chingu-dachi/shared';
import { INTEREST_TAGS } from '@chingu-dachi/shared';
import { BottomSheet } from '@/components/overlay';
import { Button, Tag } from '@/components/ui';

export interface FilterState {
  ageRange: [number, number] | null;
  interests: InterestTagId[];
}

const AGE_RANGES: { label: string; range: [number, number] }[] = [
  { label: '10대', range: [14, 19] },
  { label: '20대', range: [20, 29] },
  { label: '30대', range: [30, 39] },
  { label: '40대+', range: [40, 99] },
];

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

export function FilterPanel({
  open,
  onClose,
  filters,
  onApply,
}: FilterPanelProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'ja' ? 'ja' : 'ko';

  const [localAgeRange, setLocalAgeRange] = useState(filters.ageRange);
  const [localInterests, setLocalInterests] = useState(filters.interests);

  function handleReset() {
    setLocalAgeRange(null);
    setLocalInterests([]);
  }

  function handleApply() {
    onApply({ ageRange: localAgeRange, interests: localInterests });
    onClose();
  }

  function toggleInterest(id: InterestTagId) {
    setLocalInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={t('common:search')}>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">연령대</h3>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGES.map((item) => (
              <Tag
                key={item.label}
                label={item.label}
                variant={
                  localAgeRange?.[0] === item.range[0] ? 'selected' : 'selectable'
                }
                onClick={() =>
                  setLocalAgeRange(
                    localAgeRange?.[0] === item.range[0] ? null : item.range,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">관심사</h3>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((tag) => (
              <Tag
                key={tag.id}
                label={tag[lang]}
                variant={
                  localInterests.includes(tag.id) ? 'selected' : 'selectable'
                }
                onClick={() => toggleInterest(tag.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={handleReset}>
            초기화
          </Button>
          <Button fullWidth onClick={handleApply}>
            적용
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
