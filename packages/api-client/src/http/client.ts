import ky from 'ky';
import { getApiBaseUrl } from '@chingu-dachi/shared';
import { tokenManager } from './token';

const RETRY_HEADER = 'X-Auth-Retry';

/**
 * ky 인스턴스 — 인증 토큰 자동 주입 + 401 시 토큰 리프레시
 */
export const httpClient = ky.create({
  prefixUrl: getApiBaseUrl(),
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = tokenManager.get();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (
          response.status === 401 &&
          !request.headers.has(RETRY_HEADER)
        ) {
          try {
            const refreshResponse = await ky
              .post(`${getApiBaseUrl()}/auth/refresh`, {
                credentials: 'include',
              })
              .json<{ accessToken: string }>();

            tokenManager.set(refreshResponse.accessToken);
            request.headers.set(
              'Authorization',
              `Bearer ${refreshResponse.accessToken}`,
            );
            request.headers.set(RETRY_HEADER, '1');
            return ky(request);
          } catch {
            tokenManager.clear();
            return response;
          }
        }
        return response;
      },
    ],
  },
});
