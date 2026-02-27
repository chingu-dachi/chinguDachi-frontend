import type { Message } from './message';
import type { User } from './user';

export interface ChatRoom {
  roomId: string;
  participants: [User, User];
  lastMessage: Message | null;
  lastMessageAt: string | null;
  unreadCount: number;
  createdAt: string;
}
