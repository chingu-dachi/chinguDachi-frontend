import { http, HttpResponse } from 'msw';
import { MOCK_USER } from '../data/fixtures';

const API_BASE = 'http://localhost:8080/api';

const TAKEN_NICKNAMES = ['taken', 'admin', '관리자'];

export const userHandlers = [
  // 내 프로필 조회
  http.get(`${API_BASE}/users/me`, () => {
    return HttpResponse.json({
      success: true,
      data: MOCK_USER,
    });
  }),

  // 프로필 셋업 (온보딩)
  http.post(`${API_BASE}/users/me/setup`, async ({ request }) => {
    const body = (await request.json()) as { nickname: string };

    if (TAKEN_NICKNAMES.includes(body.nickname)) {
      return HttpResponse.json(
        {
          success: false,
          error: { code: 'DUPLICATE_NICKNAME', message: '이미 사용 중인 닉네임입니다' },
        },
        { status: 409 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: { ...MOCK_USER, ...body, onboardingRequired: false },
    });
  }),

  // 닉네임 중복 체크
  http.get(`${API_BASE}/users/check-nickname`, ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get('nickname') ?? '';

    return HttpResponse.json({
      success: true,
      data: { available: !TAKEN_NICKNAMES.includes(nickname) },
    });
  }),

  // 유저 목록
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json({
      success: true,
      data: { items: [MOCK_USER], nextCursor: null, hasMore: false },
    });
  }),

  // 프로필 수정
  http.patch(`${API_BASE}/users/me`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: { ...MOCK_USER, ...(body as Record<string, unknown>) },
    });
  }),
];
