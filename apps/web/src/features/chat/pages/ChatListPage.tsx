import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInfiniteChatRooms } from '@chingu-dachi/store';
import { Header } from '@/components/layout';
import { Spinner } from '@/components/ui';
import { EmptyState, ErrorFallback } from '@/components/feedback';
import { ChatRoomItem } from '../components';

export function ChatListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteChatRooms();

  const rooms = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => (page.success ? page.data.items : []));
  }, [data]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col">
      <Header title={t('tabs.chat')} />

      {rooms.length === 0 ? (
        <EmptyState
          message={t('chat:emptyChat')}
          actionLabel={t('chat:findFriends')}
          onAction={() => navigate('/home')}
        />
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {rooms.map((room, index) => (
            <div
              key={room.roomId}
              ref={index === rooms.length - 1 ? lastElementRef : undefined}
            >
              <ChatRoomItem
                room={room}
                onClick={(roomId) => navigate(`/chat/${roomId}`)}
              />
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Spinner size="sm" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
