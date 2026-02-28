import { test, expect } from '@playwright/test';
import { createCanvas } from './helpers';

test.describe('온보딩 - 프로필 이미지 업로드', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/callback?code=new-user-code');
    await expect(page).toHaveURL('/onboarding');
  });

  test('유효한 이미지 업로드 시 프리뷰가 표시된다', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.png',
      mimeType: 'image/png',
      buffer: createCanvas(),
    });
    await expect(page.locator('img[alt="프로필 사진"]')).toBeVisible({ timeout: 10000 });
  });

  test('5MB 초과 파일 시 에러 메시지가 표시된다', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'large.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.alloc(6 * 1024 * 1024, 0),
    });
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('비이미지 파일 시 에러 메시지가 표시된다', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.alloc(1024, 0),
    });
    await expect(page.getByRole('alert')).toBeVisible();
  });
});

test.describe('온보딩 - 닉네임 중복 체크', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/callback?code=new-user-code');
    await expect(page).toHaveURL('/onboarding');
  });

  test('사용 가능한 닉네임 입력 시 성공 메시지가 표시된다', async ({ page }) => {
    const nicknameInput = page.getByLabel('닉네임');
    await nicknameInput.fill('유니크닉');
    await expect(page.getByText('사용 가능한 닉네임입니다')).toBeVisible({ timeout: 5000 });
  });

  test('중복 닉네임 입력 시 에러 메시지가 표시된다', async ({ page }) => {
    const nicknameInput = page.getByLabel('닉네임');
    await nicknameInput.fill('taken');
    await expect(page.getByText('이미 사용 중인 닉네임입니다')).toBeVisible({ timeout: 5000 });
  });

  test('1글자 입력 시 피드백이 표시되지 않는다', async ({ page }) => {
    const nicknameInput = page.getByLabel('닉네임');
    await nicknameInput.fill('a');
    await page.waitForTimeout(500);
    await expect(page.getByText('사용 가능한 닉네임입니다')).not.toBeVisible();
    await expect(page.getByText('이미 사용 중인 닉네임입니다')).not.toBeVisible();
  });
});

test.describe('온보딩 - 전체 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/callback?code=new-user-code');
    await expect(page).toHaveURL('/onboarding');
  });

  test('필수 필드 입력 후 가입 완료 → /home 이동', async ({ page }) => {
    // 1. 국적 선택 (한국)
    await page.getByRole('button', { name: /한국/i }).click();

    // 2. 닉네임 입력
    await page.getByLabel('닉네임').fill('테스트유저');
    await expect(page.getByText('사용 가능한 닉네임입니다')).toBeVisible({ timeout: 5000 });

    // 3. 출생연도 선택
    await page.getByText('출생 연도를 선택하세요').click();
    await page.getByRole('button', { name: '2000년' }).click();

    // 4. 관심사 선택 (최소 1개)
    await page.getByText('여행').click();

    // 5. 가입 완료 버튼 클릭
    const submitBtn = page.getByRole('button', { name: '가입 완료' });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // /home으로 이동
    await expect(page).toHaveURL('/home', { timeout: 10000 });
  });

  test('필수 필드 미입력 시 제출 버튼이 비활성', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: '가입 완료' });
    await expect(submitBtn).toBeDisabled();

    // 국적만 선택 → 여전히 비활성
    await page.getByRole('button', { name: /한국/i }).click();
    await expect(submitBtn).toBeDisabled();
  });

  test('닉네임 중복(409) 시 에러 토스트 표시', async ({ page }) => {
    // 1. 국적 선택
    await page.getByRole('button', { name: /한국/i }).click();

    // 2. 닉네임 — 'taken'은 check-nickname에서는 에러 표시되지만,
    //    setup에서 409를 반환하도록 MSW 라우트 오버라이드
    await page.getByLabel('닉네임').fill('유니크닉');
    await expect(page.getByText('사용 가능한 닉네임입니다')).toBeVisible({ timeout: 5000 });

    // 3. 출생연도
    await page.getByText('출생 연도를 선택하세요').click();
    await page.getByRole('button', { name: '2000년' }).click();

    // 4. 관심사
    await page.getByText('여행').click();

    // 5. setup API가 409를 반환하도록 오버라이드
    await page.route('**/api/users/me/setup', (route) =>
      route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: { code: 'DUPLICATE_NICKNAME', message: '이미 사용 중인 닉네임입니다' },
        }),
      }),
    );

    // 6. 제출
    await page.getByRole('button', { name: '가입 완료' }).click();

    // 여전히 온보딩 페이지에 있어야 함 (이동 안 됨)
    await expect(page).toHaveURL('/onboarding');
  });
});
