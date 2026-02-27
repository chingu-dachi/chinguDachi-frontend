import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogout, useDeleteAccount } from '@chingu-dachi/store';
import { ConfirmDialog } from '@/components/feedback';

export function MenuSection() {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const logout = useLogout();
  const deleteAccount = useDeleteAccount();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleLogout() {
    logout.mutate(undefined, {
      onSettled: () => {
        navigate('/', { replace: true });
      },
    });
  }

  function handleDeleteAccount() {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    });
  }

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-100 px-4">
        <button
          type="button"
          onClick={() => setLogoutDialogOpen(true)}
          className="py-4 text-left text-body text-gray-700 hover:text-gray-900"
        >
          {t('logout')}
        </button>
        <button
          type="button"
          onClick={() => setDeleteDialogOpen(true)}
          className="py-4 text-left text-body text-danger hover:text-red-600"
        >
          {t('deleteAccount')}
        </button>
        <button
          type="button"
          className="py-4 text-left text-body text-gray-400"
        >
          {t('terms')}
        </button>
      </div>

      <ConfirmDialog
        open={logoutDialogOpen}
        title={t('logoutConfirmTitle')}
        description={t('logoutConfirmDesc')}
        confirmLabel={t('logout')}
        onConfirm={handleLogout}
        onCancel={() => setLogoutDialogOpen(false)}
        loading={logout.isPending}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('deleteConfirmTitle')}
        description={t('deleteConfirmDesc')}
        variant="danger"
        confirmLabel={t('deleteAccount')}
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteDialogOpen(false)}
        loading={deleteAccount.isPending}
      />
    </>
  );
}
