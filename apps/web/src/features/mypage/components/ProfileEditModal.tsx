import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { User, InterestTagId } from '@chingu-dachi/shared';
import { useUpdateProfile } from '@chingu-dachi/store';
import { BottomSheet } from '@/components/overlay';
import { Button } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import {
  ProfileImageUploader,
  NicknameInput,
  InterestTagSelector,
  BioInput,
  CityInput,
} from '@/features/auth/components';

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export function ProfileEditModal({ open, onClose, user }: ProfileEditModalProps) {
  const { t } = useTranslation('profile');
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();

  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl);
  const [nickname, setNickname] = useState(user.nickname);
  const [interests, setInterests] = useState<InterestTagId[]>(user.interests);
  const [bio, setBio] = useState(user.bio ?? '');
  const [city, setCity] = useState(user.city ?? '');

  const isValid = nickname.length >= 2 && nickname.length <= 12 && interests.length >= 1;

  function handleSave() {
    if (!isValid) return;

    updateProfile.mutate(
      {
        nickname,
        interests,
        bio: bio || undefined,
        city: city || undefined,
        profileImageUrl,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast('success', t('profileUpdated'));
            onClose();
          }
        },
        onError: () => {
          toast('error', t('profileUpdateError'));
        },
      },
    );
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={t('editProfile')}>
      <div className="flex flex-col gap-5">
        <ProfileImageUploader
          imageUrl={profileImageUrl}
          onChange={setProfileImageUrl}
        />

        <NicknameInput value={nickname} onChange={setNickname} />

        <InterestTagSelector selected={interests} onChange={setInterests} />

        <BioInput value={bio} onChange={setBio} />

        <CityInput value={city} onChange={setCity} />

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" fullWidth onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button
            fullWidth
            disabled={!isValid}
            loading={updateProfile.isPending}
            onClick={handleSave}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
