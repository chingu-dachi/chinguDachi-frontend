import { http, HttpResponse } from 'msw';
import { MOCK_API_BASE } from '../data/fixtures';

export const uploadHandlers = [
  http.post(`${MOCK_API_BASE}/upload/profile-image`, () => {
    return HttpResponse.json({
      success: true,
      data: { imageUrl: 'https://mock-cdn.example.com/profile/mock-image.jpg' },
    });
  }),
];
