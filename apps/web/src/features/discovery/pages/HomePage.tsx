import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { User } from '@chingu-dachi/shared';
import { useInfiniteUsers, useCreateRoom, useAuthStore } from '@chingu-dachi/store';
import { Spinner, Tag } from '@/components/ui';
import { EmptyState, ErrorFallback } from '@/components/feedback';
import { UserCard, UserProfilePopup, FilterPanel, type FilterState } from '../components';
import { calculateAge } from '@/lib/age';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    ageRange: null,
    interests: [],
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteUsers();
  const createRoom = useCreateRoom();

  const allUsers = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => (page.success ? page.data.items : []))
      .filter((user) => user.userId !== currentUser?.userId);
  }, [data, currentUser?.userId]);

  // 클라이언트 사이드 필터링
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      if (filters.ageRange) {
        const age = calculateAge(user.birthYear);
        if (age < filters.ageRange[0] || age > filters.ageRange[1]) return false;
      }
      if (filters.interests.length > 0) {
        const hasMatch = filters.interests.some((id) => user.interests.includes(id));
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [allUsers, filters]);

  // 무한 스크롤 observer
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

  function handleStartChat(userId: string) {
    createRoom.mutate(userId, {
      onSuccess: (res) => {
        if (res.success) {
          navigate(`/chat/${res.data.roomId}`);
        }
      },
    });
  }

  const activeFilterCount = (filters.ageRange ? 1 : 0) + (filters.interests.length > 0 ? 1 : 0);

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
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
        <h1 className="text-xl font-bold text-primary">친구다치</h1>
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative rounded-lg p-2 hover:bg-gray-100"
          aria-label="필터"
        >
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </header>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-2">
          {filters.ageRange && (
            <Tag
              label={`${filters.ageRange[0]}~${filters.ageRange[1]}세`}
              variant="filter"
              onClick={() => setFilters((f) => ({ ...f, ageRange: null }))}
            />
          )}
          {filters.interests.length > 0 && (
            <Tag
              label={`관심사 ${filters.interests.length}개`}
              variant="filter"
              onClick={() => setFilters((f) => ({ ...f, interests: [] }))}
            />
          )}
        </div>
      )}

      {/* User list */}
      <div className="flex flex-col gap-3 px-4 py-4">
        {filteredUsers.length === 0 ? (
          <EmptyState message={t('noResults')} />
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={user.userId}
              ref={index === filteredUsers.length - 1 ? lastElementRef : undefined}
            >
              <UserCard user={user} onClick={setSelectedUser} />
            </div>
          ))
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      {/* Popups */}
      <UserProfilePopup
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onStartChat={handleStartChat}
        loading={createRoom.isPending}
      />

      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  );
}
