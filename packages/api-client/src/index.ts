export { httpClient } from './http/client';
export { tokenManager } from './http/token';
export { authApi, type AuthTokens } from './http/auth.api';
export { userApi } from './http/user.api';
export { chatApi } from './http/chat.api';
export { uploadApi } from './http/upload.api';
export { HTTPError } from 'ky';

export { getSocket, connectSocket, disconnectSocket } from './ws/client';
export type { TypedSocket } from './ws/client';
export type { ServerToClientEvents, ClientToServerEvents } from './ws/types';
