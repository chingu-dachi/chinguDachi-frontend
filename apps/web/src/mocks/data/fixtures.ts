import type { User } from '@chingu-dachi/shared';

export const MOCK_API_BASE = 'http://localhost:8080/api';
export const MOCK_ACCESS_TOKEN = 'mock-access-token-abc123';
export const TAKEN_NICKNAMES = ['taken', 'admin', '관리자'] as const;

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
  isOnline: false,
  creditBalance: 0,
  onboardingRequired: true,
};

/**
 * MSW 핸들러 간 상태 공유 (sessionStorage 기반 — 페이지 리로드 후에도 유지)
 * 실제 백엔드의 httpOnly 쿠키 세션을 시뮬레이션
 */
export const mockState = {
  get currentUser(): User | null {
    const stored = sessionStorage.getItem('msw:currentUser');
    return stored ? (JSON.parse(stored) as User) : null;
  },
  set currentUser(user: User | null) {
    if (user) {
      sessionStorage.setItem('msw:currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('msw:currentUser');
    }
  },
  get hasSession(): boolean {
    return sessionStorage.getItem('msw:hasSession') === 'true';
  },
  set hasSession(value: boolean) {
    if (value) {
      sessionStorage.setItem('msw:hasSession', 'true');
    } else {
      sessionStorage.removeItem('msw:hasSession');
    }
  },
};
