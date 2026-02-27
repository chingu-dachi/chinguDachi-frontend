import type { ChatRoom } from '@chingu-dachi/shared';
import { formatChatListTime } from '@chingu-dachi/shared';
import { useAuthStore } from '@chingu-dachi/store';
import { Avatar, Badge } from '@/components/ui';

interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (roomId: string) => void;
}

export function ChatRoomItem({ room, onClick }: ChatRoomItemProps) {
  const currentUserId = useAuthStore((s) => s.user?.userId);
  const partner = room.participants.find((p) => p.userId !== currentUserId) ?? room.participants[0];

  const lastMessageText = room.lastMessage?.translatedText ?? room.lastMessage?.originalText;
  const timeText = room.lastMessageAt ? formatChatListTime(room.lastMessageAt) : '';

  return (
    <button
      type="button"
      onClick={() => onClick(room.roomId)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
    >
      <Avatar src={partner.profileImageUrl} alt={partner.nickname} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="font-medium">{partner.nickname}</span>
          <span className="shrink-0 text-caption text-gray-400">{timeText}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="truncate text-sm text-gray-500">
            {lastMessageText ?? '대화를 시작해보세요'}
          </p>
          <Badge count={room.unreadCount} className="ml-2 shrink-0" />
        </div>
      </div>
    </button>
  );
}
