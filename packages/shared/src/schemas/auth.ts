import { z } from 'zod';

const interestTagIds = [
  'travel',
  'food',
  'cafe',
  'music',
  'kpop',
  'jpop',
  'anime',
  'movie',
  'gaming',
  'fashion',
  'sports',
  'language',
  'cooking',
  'photo',
  'reading',
] as const;

export const onboardingSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(12, '닉네임은 12자 이하여야 합니다'),
  nationality: z.enum(['KR', 'JP']),
  birthYear: z
    .number()
    .int()
    .min(1945)
    .max(new Date().getFullYear() - 14),
  interests: z
    .array(z.enum(interestTagIds))
    .min(1, '관심사를 1개 이상 선택해주세요'),
  bio: z
    .string()
    .max(50, '한 줄 소개는 50자 이하여야 합니다')
    .optional(),
  city: z
    .string()
    .max(20, '도시는 20자 이하여야 합니다')
    .optional(),
  profileImageUrl: z.string().url().nullable().optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
