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
    return HttpResponse.json({
      success: true,
      data: { accessToken: MOCK_ACCESS_TOKEN },
    });
  }),

  http.post(`${MOCK_API_BASE}/auth/logout`, () => {
    mockState.currentUser = null;
    return HttpResponse.json({ success: true, data: null });
  }),
];
