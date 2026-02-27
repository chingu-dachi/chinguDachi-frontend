import ky from 'ky';
import { getApiBaseUrl } from '@chingu-dachi/shared';

/**
 * ky 인스턴스 — 인증 토큰 자동 주입 + 401 시 토큰 리프레시
 */
export const httpClient = ky.create({
  prefixUrl: getApiBaseUrl(),
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return response;
          }

          try {
            const refreshResponse = await ky
              .post(`${getApiBaseUrl()}/auth/refresh`, {
                json: { refreshToken },
              })
              .json<{ accessToken: string }>();

            localStorage.setItem('access_token', refreshResponse.accessToken);
            request.headers.set(
              'Authorization',
              `Bearer ${refreshResponse.accessToken}`,
            );
            return ky(request);
          } catch {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return response;
          }
        }
        return response;
      },
    ],
  },
});
