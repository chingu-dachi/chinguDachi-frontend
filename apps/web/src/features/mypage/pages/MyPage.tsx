import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@chingu-dachi/store';
import { Header } from '@/components/layout';
import { Spinner } from '@/components/ui';
import { ProfileSection, CreditSection, MenuSection, ProfileEditModal } from '../components';

export function MyPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [editOpen, setEditOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header title={t('tabs.mypage')} />

      <ProfileSection user={user} onEdit={() => setEditOpen(true)} />

      <CreditSection />

      <div className="mt-6">
        <MenuSection />
      </div>

      <ProfileEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
      />
    </div>
  );
}
