export { httpClient } from './http/client';
export { authApi, type AuthTokens } from './http/auth.api';
export { userApi } from './http/user.api';
export { chatApi } from './http/chat.api';

export { getSocket, connectSocket, disconnectSocket } from './ws/client';
export type { TypedSocket } from './ws/client';
export type { ServerToClientEvents, ClientToServerEvents } from './ws/types';
