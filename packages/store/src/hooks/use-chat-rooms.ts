import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@chingu-dachi/api-client';
import { chatKeys } from './query-keys';

export function useChatRooms(cursor?: string) {
  return useQuery({
    queryKey: chatKeys.roomList(cursor),
    queryFn: () => chatApi.getChatRooms(cursor),
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: string) => chatApi.createRoom(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.rooms() });
    },
  });
}
