import { io, type Socket } from 'socket.io-client';
import { getWsUrl } from '@chingu-dachi/shared';
import { tokenManager } from '../http/token';
import type { ClientToServerEvents, ServerToClientEvents } from './types';

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: TypedSocket | null = null;

/**
 * 타입 안전한 socket.io 인스턴스를 생성/반환
 */
export function getSocket(): TypedSocket {
  if (!socket) {
    socket = io(getWsUrl(), {
      autoConnect: false,
      auth: () => {
        return { token: tokenManager.get() };
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function connectSocket(): void {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}
