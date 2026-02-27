import { z } from 'zod';

export const sendMessageSchema = z.object({
  roomId: z.string().uuid(),
  text: z
    .string()
    .min(1, '메시지를 입력해주세요')
    .max(1000, '메시지는 1000자 이하여야 합니다'),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
