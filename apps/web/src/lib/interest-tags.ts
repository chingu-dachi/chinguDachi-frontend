import { INTEREST_TAG_MAP, type InterestTagId } from '@chingu-dachi/shared';

export function getInterestLabel(
  tagId: InterestTagId,
  language: 'ko' | 'ja',
): string {
  return INTEREST_TAG_MAP[tagId][language];
}
