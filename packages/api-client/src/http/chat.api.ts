import type {
  ApiResponse,
  PaginatedResponse,
  ChatRoom,
  Message,
} from '@chingu-dachi/shared';
import { httpClient } from './client';

export const chatApi = {
  getChatRooms: (cursor?: string) =>
    httpClient
      .get('chat/rooms', { searchParams: cursor ? { cursor } : {} })
      .json<ApiResponse<PaginatedResponse<ChatRoom>>>(),

  getMessages: (roomId: string, cursor?: string) =>
    httpClient
      .get(`chat/rooms/${roomId}/messages`, {
        searchParams: cursor ? { cursor } : {},
      })
      .json<ApiResponse<PaginatedResponse<Message>>>(),

  createRoom: (targetUserId: string) =>
    httpClient
      .post('chat/rooms', { json: { targetUserId } })
      .json<ApiResponse<ChatRoom>>(),

  sendMessage: (roomId: string, text: string) =>
    httpClient
      .post(`chat/rooms/${roomId}/messages`, { json: { text } })
      .json<ApiResponse<Message>>(),
};
