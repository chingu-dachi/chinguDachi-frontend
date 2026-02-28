import { http, HttpResponse } from 'msw';
import { MOCK_ACCESS_TOKEN, MOCK_USER, MOCK_NEW_USER } from '../data/fixtures';

const API_BASE = 'http://localhost:8080/api';

export const authHandlers = [
  // Google OAuth 로그인
  http.post(`${API_BASE}/auth/google`, async ({ request }) => {
    const body = (await request.json()) as { code: string };

    // 'new-user-code'일 때 신규 유저
    if (body.code === 'new-user-code') {
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: MOCK_ACCESS_TOKEN,
          onboardingRequired: true,
          user: MOCK_NEW_USER,
        },
      });
    }

    return HttpResponse.json({
      success: true,
      data: {
        accessToken: MOCK_ACCESS_TOKEN,
        onboardingRequired: false,
        user: MOCK_USER,
      },
    });
  }),

  // 토큰 리프레시
  http.post(`${API_BASE}/auth/refresh`, () => {
    return HttpResponse.json({
      success: true,
      data: { accessToken: MOCK_ACCESS_TOKEN },
    });
  }),

  // 로그아웃
  http.post(`${API_BASE}/auth/logout`, () => {
    return HttpResponse.json({ success: true, data: null });
  }),
];
