/**
 * 타입 안전한 TanStack Query 캐시 키 팩토리
 *
 * 백엔드 비유: Redis 키 네이밍 컨벤션과 동일한 역할.
 * 계층적 구조로 invalidation 범위를 제어한다.
 */
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (cursor?: string) => [...userKeys.lists(), cursor] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (userId: string) => [...userKeys.details(), userId] as const,
};

export const chatKeys = {
  all: ['chat'] as const,
  rooms: () => [...chatKeys.all, 'rooms'] as const,
  roomList: (cursor?: string) => [...chatKeys.rooms(), cursor] as const,
  messages: (roomId: string) =>
    [...chatKeys.all, 'messages', roomId] as const,
  messageList: (roomId: string, cursor?: string) =>
    [...chatKeys.messages(roomId), cursor] as const,
  typing: (roomId: string) =>
    [...chatKeys.all, 'typing', roomId] as const,
};
