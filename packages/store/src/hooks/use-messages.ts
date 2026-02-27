import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@chingu-dachi/api-client';
import type { Message } from '@chingu-dachi/shared';
import { chatKeys } from './query-keys';

export function useMessages(roomId: string, cursor?: string) {
  return useQuery({
    queryKey: chatKeys.messageList(roomId, cursor),
    queryFn: () => chatApi.getMessages(roomId, cursor),
    enabled: !!roomId,
  });
}

export function useSendMessage(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => chatApi.sendMessage(roomId, text),

    // Optimistic Update: 전송 즉시 로컬 캐시에 추가
    onMutate: async (text) => {
      await queryClient.cancelQueries({
        queryKey: chatKeys.messages(roomId),
      });

      const previousData = queryClient.getQueryData(
        chatKeys.messageList(roomId),
      );

      const optimisticMessage: Message = {
        messageId: crypto.randomUUID(),
        roomId,
        senderId: '', // 실제 사용 시 authStore에서 가져옴
        originalText: text,
        translatedText: null,
        status: 'sending',
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        chatKeys.messageList(roomId),
        (old: unknown) => {
          const prev = old as
            | { success: true; data: { items: Message[] } }
            | undefined;
          if (!prev?.success) return old;
          return {
            ...prev,
            data: {
              ...prev.data,
              items: [...prev.data.items, optimisticMessage],
            },
          };
        },
      );

      return { previousData };
    },

    // 실패 시 롤백
    onError: (_err, _text, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          chatKeys.messageList(roomId),
          context.previousData,
        );
      }
    },

    // 성공/실패 후 서버 데이터로 리페치
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(roomId) });
    },
  });
}
