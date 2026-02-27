import type { Message } from '@chingu-dachi/shared';

export interface ServerToClientEvents {
  new_message: (message: Message) => void;
  message_translated: (data: {
    messageId: string;
    translatedText: string;
  }) => void;
  typing_start: (data: { roomId: string; userId: string }) => void;
  typing_stop: (data: { roomId: string; userId: string }) => void;
  user_online: (data: { userId: string }) => void;
  user_offline: (data: { userId: string }) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  send_message: (data: { roomId: string; text: string }) => void;
  typing_start: (roomId: string) => void;
  typing_stop: (roomId: string) => void;
}
