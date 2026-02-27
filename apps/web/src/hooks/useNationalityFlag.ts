import type { Nationality } from '@chingu-dachi/shared';

const FLAGS: Record<Nationality, string> = {
  KR: '🇰🇷',
  JP: '🇯🇵',
};

export function useNationalityFlag(nationality: Nationality): string {
  return FLAGS[nationality];
}
