import type { ApiResponse } from '@chingu-dachi/shared';
import { httpClient } from './client';

export const uploadApi = {
  profileImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return httpClient
      .post('upload/profile-image', { body: formData })
      .json<ApiResponse<{ imageUrl: string }>>();
  },
};
