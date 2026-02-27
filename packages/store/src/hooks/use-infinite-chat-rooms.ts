import { useInfiniteQuery } from '@tanstack/react-query';
import { chatApi } from '@chingu-dachi/api-client';
import { chatKeys } from './query-keys';

export function useInfiniteChatRooms() {
  return useInfiniteQuery({
    queryKey: chatKeys.rooms(),
    queryFn: ({ pageParam }) => chatApi.getChatRooms(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      return lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined;
    },
  });
}
