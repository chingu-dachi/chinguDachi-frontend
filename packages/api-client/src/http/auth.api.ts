import type { ApiResponse, User } from '@chingu-dachi/shared';
import { httpClient } from './client';

export interface AuthTokens {
  accessToken: string;
  onboardingRequired: boolean;
  user: User;
}

export const authApi = {
  loginWithOAuth: (provider: string, code: string) =>
    httpClient
      .post('auth/google', { json: { provider, code } })
      .json<ApiResponse<AuthTokens>>(),

  refreshToken: () =>
    httpClient
      .post('auth/refresh')
      .json<ApiResponse<{ accessToken: string }>>(),

  logout: () => httpClient.post('auth/logout').json<ApiResponse<null>>(),
};
