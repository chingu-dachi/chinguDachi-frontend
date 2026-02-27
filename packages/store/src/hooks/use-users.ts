import { useQuery } from '@tanstack/react-query';
import { userApi } from '@chingu-dachi/api-client';
import { userKeys } from './query-keys';

export function useUsers(cursor?: string) {
  return useQuery({
    queryKey: userKeys.list(cursor),
    queryFn: () => userApi.getUsers(cursor),
  });
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => userApi.getProfile(userId),
    enabled: !!userId,
  });
}
