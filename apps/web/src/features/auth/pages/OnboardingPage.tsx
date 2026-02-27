import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Nationality, InterestTagId } from '@chingu-dachi/shared';
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

  const [nationality, setNationality] = useState<Nationality | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [interests, setInterests] = useState<InterestTagId[]>([]);
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    nationality !== null &&
    nickname.length >= 2 &&
    nickname.length <= 12 &&
    birthYear !== null &&
    interests.length >= 1;

  async function handleSubmit() {
    if (!isValid || !nationality || !birthYear) return;

    setIsSubmitting(true);
    try {
      // TODO: useSetupProfile API 연동
      // await setupProfile({ nationality, nickname, birthYear, interests, bio, city, profileImageUrl });
      toast('success', t('onboardingComplete'));
      navigate('/home', { replace: true });
    } catch {
      toast('error', t('onboardingError'));
    } finally {
      setIsSubmitting(false);
    }
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
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          {t('completeSignup')}
        </Button>
      </div>
    </div>
  );
}
