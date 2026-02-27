import { useInfiniteQuery } from '@tanstack/react-query';
import { chatApi } from '@chingu-dachi/api-client';
import { chatKeys } from './query-keys';

export function useInfiniteMessages(roomId: string) {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(roomId),
    queryFn: ({ pageParam }) => chatApi.getMessages(roomId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      return lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined;
    },
    enabled: !!roomId,
  });
}
