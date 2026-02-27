import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  useInfiniteMessages,
  useSendMessage,
  useAuthStore,
  useChatStore,
} from '@chingu-dachi/store';
import { BackHeader } from '@/components/layout';
import { Spinner } from '@/components/ui';
import { ConnectionBanner, ErrorFallback } from '@/components/feedback';
import { DateDivider, MyBubble, PartnerBubble, MessageInput } from '../components';

export function ChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const currentUserId = useAuthStore((s) => s.user?.userId);
  const setActiveRoom = useChatStore((s) => s.setActiveRoom);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteMessages(roomId ?? '');
  const sendMessage = useSendMessage(roomId ?? '');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomId) setActiveRoom(roomId);
    return () => setActiveRoom(null);
  }, [roomId, setActiveRoom]);

  // 새 메시지 시 스크롤 하단
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  const messages = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => (page.success ? page.data.items : []));
  }, [data]);

  // 무한 스크롤 (상단 로드)
  const topObserverRef = useRef<IntersectionObserver | null>(null);
  const topElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (topObserverRef.current) topObserverRef.current.disconnect();
      topObserverRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) topObserverRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  // 날짜 그룹화
  function shouldShowDate(index: number): boolean {
    if (index === 0) return true;
    const prev = messages[index - 1];
    const curr = messages[index];
    if (!prev || !curr) return false;
    return prev.createdAt.slice(0, 10) !== curr.createdAt.slice(0, 10);
  }

  function handleSend(text: string) {
    sendMessage.mutate(text);
  }

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback onRetry={() => refetch()} />;
  }

  return (
    <div className="flex h-dvh flex-col">
      <BackHeader title={roomId ? '채팅' : ''} />
      <ConnectionBanner connected={true} />

      <div className="flex flex-1 flex-col overflow-y-auto py-2">
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner size="sm" />
          </div>
        )}
        <div ref={topElementRef} />

        {messages.map((message, index) => (
          <div key={message.messageId}>
            {shouldShowDate(index) && (
              <DateDivider date={message.createdAt} />
            )}
            {message.senderId === currentUserId ? (
              <MyBubble message={message} />
            ) : (
              <PartnerBubble message={message} />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
