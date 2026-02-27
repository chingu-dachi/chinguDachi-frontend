import { useInfiniteQuery } from '@tanstack/react-query';
import { userApi } from '@chingu-dachi/api-client';
import { userKeys } from './query-keys';

export function useInfiniteUsers() {
  return useInfiniteQuery({
    queryKey: userKeys.lists(),
    queryFn: ({ pageParam }) => userApi.getUsers(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      return lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined;
    },
  });
}
