import type { ApiResponse, User } from '@chingu-dachi/shared';
import { httpClient } from './client';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = {
  loginWithOAuth: (provider: string, code: string) =>
    httpClient
      .post('auth/login', { json: { provider, code } })
      .json<ApiResponse<AuthTokens>>(),

  refreshToken: (refreshToken: string) =>
    httpClient
      .post('auth/refresh', { json: { refreshToken } })
      .json<ApiResponse<{ accessToken: string }>>(),

  logout: () => httpClient.post('auth/logout').json<ApiResponse<null>>(),
};
