import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui';

interface TabItem {
  path: string;
  labelKey: string;
  icon: React.ReactNode;
  badge?: number;
}

interface TabBarProps {
  unreadCount?: number;
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function MyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export function TabBar({ unreadCount = 0 }: TabBarProps) {
  const { t } = useTranslation();

  const tabs: TabItem[] = [
    { path: '/home', labelKey: 'tabs.home', icon: <HomeIcon className="h-6 w-6" /> },
    { path: '/chat', labelKey: 'tabs.chat', icon: <ChatIcon className="h-6 w-6" />, badge: unreadCount },
    { path: '/mypage', labelKey: 'tabs.mypage', icon: <MyIcon className="h-6 w-6" /> },
  ];

  return (
    <nav
      className="flex h-14 items-center border-t border-gray-200 bg-white pb-safe-bottom"
      role="tablist"
      aria-label="메인 탭"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          role="tab"
          className={({ isActive }) =>
            cn(
              'relative flex flex-1 flex-col items-center gap-0.5 py-1.5 text-caption transition-colors',
              isActive ? 'text-primary' : 'text-gray-400',
            )
          }
        >
          {tab.icon}
          <span>{t(tab.labelKey)}</span>
          {tab.badge ? (
            <Badge
              count={tab.badge}
              className="absolute right-1/4 top-0.5"
            />
          ) : null}
        </NavLink>
      ))}
    </nav>
  );
}
