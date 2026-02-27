export type MessageStatus = 'sending' | 'sent' | 'failed';

export interface Message {
  messageId: string;
  roomId: string;
  senderId: string;
  originalText: string;
  translatedText: string | null;
  status: MessageStatus;
  createdAt: string;
}
