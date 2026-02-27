import type {
  ApiResponse,
  PaginatedResponse,
  User,
  OnboardingInput,
  ProfileEditInput,
} from '@chingu-dachi/shared';
import { httpClient } from './client';

export const userApi = {
  getUsers: (cursor?: string) =>
    httpClient
      .get('users', { searchParams: cursor ? { cursor } : {} })
      .json<ApiResponse<PaginatedResponse<User>>>(),

  getProfile: (userId: string) =>
    httpClient.get(`users/${userId}`).json<ApiResponse<User>>(),

  getMyProfile: () =>
    httpClient.get('users/me').json<ApiResponse<User>>(),

  setupProfile: (data: OnboardingInput) =>
    httpClient
      .post('users/me/setup', { json: data })
      .json<ApiResponse<User>>(),

  updateProfile: (data: ProfileEditInput) =>
    httpClient
      .patch('users/me', { json: data })
      .json<ApiResponse<User>>(),

  checkNickname: (nickname: string) =>
    httpClient
      .get('users/check-nickname', { searchParams: { nickname } })
      .json<ApiResponse<{ available: boolean }>>(),

  deleteAccount: () =>
    httpClient.delete('users/me').json<ApiResponse<null>>(),
};
