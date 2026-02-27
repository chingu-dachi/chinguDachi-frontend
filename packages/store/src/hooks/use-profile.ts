import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@chingu-dachi/api-client';
import type { OnboardingInput, ProfileEditInput } from '@chingu-dachi/shared';
import { useAuthStore } from '../stores/auth.store';
import { authKeys, userKeys } from './query-keys';

export function useSetupProfile() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OnboardingInput) => userApi.setupProfile(data),
    onSuccess: (res) => {
      if (res.success) {
        setUser(res.data);
        queryClient.invalidateQueries({ queryKey: authKeys.all });
      }
    },
  });
}

export function useUpdateProfile() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileEditInput) => userApi.updateProfile(data),
    onSuccess: (res) => {
      if (res.success) {
        setUser(res.data);
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
        queryClient.invalidateQueries({ queryKey: userKeys.all });
      }
    },
  });
}

export function useCheckNickname(nickname: string) {
  return useQuery({
    queryKey: [...userKeys.all, 'check-nickname', nickname] as const,
    queryFn: () => userApi.checkNickname(nickname),
    enabled: nickname.length >= 2,
  });
}

export function useDeleteAccount() {
  const clearUser = useAuthStore((s) => s.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi.deleteAccount(),
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      clearUser();
      queryClient.clear();
    },
  });
}
