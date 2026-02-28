import type { User } from '@chingu-dachi/shared';

export const MOCK_ACCESS_TOKEN = 'mock-access-token-abc123';

export const MOCK_USER: User = {
  userId: 'user-001',
  email: 'taro@example.com',
  nickname: 'タロウ',
  profileImageUrl: null,
  nationality: 'JP',
  nativeLanguage: 'ja',
  birthYear: 1995,
  interests: ['travel', 'food', 'language'],
  bio: '韓国語勉強中！',
  city: '東京',
  isOnline: true,
  lastSeenAt: null,
  creditBalance: 100,
  onboardingRequired: false,
  createdAt: '2026-01-01T00:00:00Z',
};

export const MOCK_NEW_USER: User = {
  ...MOCK_USER,
  userId: 'user-002',
  email: 'minsu@example.com',
  nickname: '',
  nationality: 'KR',
  nativeLanguage: 'ko',
  bio: null,
  city: null,
  interests: [],
  onboardingRequired: true,
};
