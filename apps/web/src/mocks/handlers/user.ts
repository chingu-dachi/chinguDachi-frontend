import { http, HttpResponse } from 'msw';
import { MOCK_API_BASE, MOCK_USER, TAKEN_NICKNAMES, mockState } from '../data/fixtures';

export const userHandlers = [
  http.get(`${MOCK_API_BASE}/users/me`, () => {
    if (!mockState.currentUser) {
      return HttpResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      success: true,
      data: mockState.currentUser,
    });
  }),

  http.post(`${MOCK_API_BASE}/users/me/setup`, async ({ request }) => {
    const body = (await request.json()) as { nickname: string };

    if (TAKEN_NICKNAMES.includes(body.nickname as (typeof TAKEN_NICKNAMES)[number])) {
      return HttpResponse.json(
        {
          success: false,
          error: { code: 'DUPLICATE_NICKNAME', message: '이미 사용 중인 닉네임입니다' },
        },
        { status: 409 },
      );
    }

    const updatedUser = { ...(mockState.currentUser ?? MOCK_USER), ...body, onboardingRequired: false };
    mockState.currentUser = updatedUser;
    return HttpResponse.json({
      success: true,
      data: updatedUser,
    });
  }),

  http.get(`${MOCK_API_BASE}/users/check-nickname`, ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get('nickname') ?? '';

    return HttpResponse.json({
      success: true,
      data: {
        available: !TAKEN_NICKNAMES.includes(nickname as (typeof TAKEN_NICKNAMES)[number]),
      },
    });
  }),

  http.get(`${MOCK_API_BASE}/users`, () => {
    return HttpResponse.json({
      success: true,
      data: { items: [MOCK_USER], nextCursor: null, hasMore: false },
    });
  }),

  http.patch(`${MOCK_API_BASE}/users/me`, async ({ request }) => {
    const body = (await request.json()) as Partial<typeof MOCK_USER>;
    return HttpResponse.json({
      success: true,
      data: { ...MOCK_USER, ...body },
    });
  }),
];
