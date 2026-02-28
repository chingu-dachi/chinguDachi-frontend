import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Nationality, InterestTagId } from '@chingu-dachi/shared';
import { useSetupProfile, authKeys } from '@chingu-dachi/store';
import { useQueryClient } from '@tanstack/react-query';
import { BackHeader } from '@/components/layout';
import { Button } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import {
  NationalitySelector,
  ProfileImageUploader,
  NicknameInput,
  BirthYearPicker,
  InterestTagSelector,
  BioInput,
  CityInput,
} from '../components';

export function OnboardingPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const setupProfile = useSetupProfile();

  const [nationality, setNationality] = useState<Nationality | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [interests, setInterests] = useState<InterestTagId[]>([]);
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  const handleNicknameValidation = useCallback((valid: boolean) => {
    setIsNicknameValid(valid);
  }, []);

  const isValid =
    nationality !== null &&
    isNicknameValid &&
    birthYear !== null &&
    interests.length >= 1;

  function handleSubmit() {
    if (!isValid || !nationality || !birthYear) return;

    setupProfile.mutate(
      {
        nationality,
        nickname: nickname.trim(),
        birthYear,
        interests,
        bio: bio.trim() || undefined,
        city: city.trim() || undefined,
        profileImageUrl: profileImageUrl ?? undefined,
      },
      {
        onSuccess: () => {
          toast('success', t('onboardingComplete'));
          queryClient.invalidateQueries({ queryKey: authKeys.me() });
          navigate('/home', { replace: true });
        },
        onError: (error) => {
          if (error instanceof Error && error.message.includes('409')) {
            toast('error', t('nicknameDuplicate'));
          } else {
            toast('error', t('onboardingError'));
          }
        },
      },
    );
  }

  return (
    <div className="flex h-dvh flex-col">
      <BackHeader title={t('onboarding')} />
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <NationalitySelector
            value={nationality}
            onChange={setNationality}
          />

          <ProfileImageUploader
            imageUrl={profileImageUrl}
            onChange={setProfileImageUrl}
          />

          <NicknameInput
            value={nickname}
            onChange={setNickname}
            onValidation={handleNicknameValidation}
          />

          <BirthYearPicker
            value={birthYear}
            onChange={setBirthYear}
          />

          <InterestTagSelector
            selected={interests}
            onChange={setInterests}
          />

          <BioInput value={bio} onChange={setBio} />

          <CityInput value={city} onChange={setCity} />
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 pb-safe-bottom">
        <Button
          fullWidth
          size="lg"
          disabled={!isValid}
          loading={setupProfile.isPending}
          onClick={handleSubmit}
        >
          {t('completeSignup')}
        </Button>
      </div>
    </div>
  );
}
