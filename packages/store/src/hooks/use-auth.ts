import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, userApi, tokenManager } from '@chingu-dachi/api-client';
import { useAuthStore } from '../stores/auth.store';
import { authKeys } from './query-keys';

export function useMe() {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await userApi.getMyProfile();
      if (res.success) {
        setUser(res.data);
      }
      return res;
    },
    retry: false,
  });
}

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ provider, code }: { provider: string; code: string }) =>
      authApi.loginWithOAuth(provider, code),
    onSuccess: (res) => {
      if (res.success) {
        tokenManager.set(res.data.accessToken);
        setUser(res.data.user);
        queryClient.invalidateQueries({ queryKey: authKeys.all });
      }
    },
  });
}

export function useLogout() {
  const clearUser = useAuthStore((s) => s.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      tokenManager.clear();
      clearUser();
      queryClient.clear();
    },
  });
}
