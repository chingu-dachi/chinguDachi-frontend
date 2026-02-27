/**
 * 메시지 시간을 "오후 3:42" 형식으로 포맷
 */
export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * 상대 날짜를 "오늘", "어제", "3일 전", "2025.02.27" 형식으로 포맷
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

const DAY_NAMES_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

/**
 * 채팅 목록용 시간 포맷
 * 오늘 → HH:mm, 어제 → "어제", 이번주 → 요일, 그 외 → M월 D일
 */
export function formatChatListTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const toDateOnly = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor(
    (toDateOnly(now).getTime() - toDateOnly(date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${DAY_NAMES_KO[date.getDay()]}요일`;

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}
