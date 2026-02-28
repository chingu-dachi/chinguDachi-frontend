import { http, HttpResponse } from 'msw';
import {
  MOCK_API_BASE,
  MOCK_ACCESS_TOKEN,
  MOCK_USER,
  MOCK_NEW_USER,
  mockState,
} from '../data/fixtures';

export const authHandlers = [
  http.post(`${MOCK_API_BASE}/auth/google`, async ({ request }) => {
    const body = (await request.json()) as { code: string };

    if (body.code === 'new-user-code') {
      mockState.currentUser = { ...MOCK_NEW_USER };
      mockState.hasSession = true;
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: MOCK_ACCESS_TOKEN,
          onboardingRequired: true,
          user: MOCK_NEW_USER,
        },
      });
    }

    mockState.currentUser = { ...MOCK_USER };
    mockState.hasSession = true;
    return HttpResponse.json({
      success: true,
      data: {
        accessToken: MOCK_ACCESS_TOKEN,
        onboardingRequired: false,
        user: MOCK_USER,
      },
    });
  }),

  http.post(`${MOCK_API_BASE}/auth/refresh`, () => {
    // 세션이 없으면 refresh 실패 (로그인한 적 없는 유저)
    if (!mockState.hasSession) {
      return HttpResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No session' } },
        { status: 401 },
      );
    }
    // refresh 성공 시 유저 상태 복원 (쿠키 기반 세션 유지 시뮬레이션)
    if (!mockState.currentUser) {
      mockState.currentUser = { ...MOCK_USER };
    }
    return HttpResponse.json({
      success: true,
      data: { accessToken: MOCK_ACCESS_TOKEN },
    });
  }),

  http.post(`${MOCK_API_BASE}/auth/logout`, () => {
    mockState.currentUser = null;
    mockState.hasSession = false;
    return HttpResponse.json({ success: true, data: null });
  }),
];
