import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard } from '@/guards/GuestGuard';
import { AuthGuard } from '@/guards/AuthGuard';
import { OnboardingGuard } from '@/guards/OnboardingGuard';
import { TabLayout } from '@/components/layout';

import { LandingPage } from '@/features/auth/pages/LandingPage';
import { OAuthCallbackPage } from '@/features/auth/pages/OAuthCallbackPage';
import { OnboardingPage } from '@/features/auth/pages/OnboardingPage';
import { HomePage } from '@/features/discovery/pages/HomePage';
import { ChatListPage } from '@/features/chat/pages/ChatListPage';
import { ChatRoomPage } from '@/features/chat/pages/ChatRoomPage';
import { MyPage } from '@/features/mypage/pages/MyPage';

export const router = createBrowserRouter([
  // Guest routes
  {
    element: <GuestGuard />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/auth/callback', element: <OAuthCallbackPage /> },
    ],
  },

  // Onboarding (authenticated but not onboarded)
  {
    element: <AuthGuard />,
    children: [
      {
        element: <OnboardingGuard />,
        children: [{ path: '/onboarding', element: <OnboardingPage /> }],
      },
    ],
  },

  // Authenticated + onboarded routes with TabLayout
  {
    element: <AuthGuard requireOnboarding />,
    children: [
      {
        element: <TabLayout />,
        children: [
          { path: '/home', element: <HomePage /> },
          { path: '/chat', element: <ChatListPage /> },
          { path: '/mypage', element: <MyPage /> },
        ],
      },
      { path: '/chat/:roomId', element: <ChatRoomPage /> },
    ],
  },
]);
