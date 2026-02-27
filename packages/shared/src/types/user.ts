export type Nationality = 'KR' | 'JP';

export type NativeLanguage = 'ko' | 'ja';

export type InterestTagId =
  | 'travel'
  | 'food'
  | 'cafe'
  | 'music'
  | 'kpop'
  | 'jpop'
  | 'anime'
  | 'movie'
  | 'gaming'
  | 'fashion'
  | 'sports'
  | 'language'
  | 'cooking'
  | 'photo'
  | 'reading';

export interface User {
  userId: string;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  nationality: Nationality;
  nativeLanguage: NativeLanguage;
  birthYear: number;
  interests: InterestTagId[];
  bio: string | null;
  city: string | null;
  isOnline: boolean;
  lastSeenAt: string | null;
  creditBalance: number;
  onboardingRequired: boolean;
  createdAt: string;
}
