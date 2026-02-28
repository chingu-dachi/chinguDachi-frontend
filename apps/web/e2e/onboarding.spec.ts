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
    // 'taken'은 TAKEN_NICKNAMES에 포함
    await nicknameInput.fill('taken');
    await expect(page.getByText('이미 사용 중인 닉네임입니다')).toBeVisible({ timeout: 5000 });
  });

  test('1글자 입력 시 피드백이 표시되지 않는다', async ({ page }) => {
    const nicknameInput = page.getByLabel('닉네임');
    await nicknameInput.fill('a');
    // 300ms 디바운스 + 쿼리 실행 대기 후에도 피드백 없어야 함
    await page.waitForTimeout(500);
    await expect(page.getByText('사용 가능한 닉네임입니다')).not.toBeVisible();
    await expect(page.getByText('이미 사용 중인 닉네임입니다')).not.toBeVisible();
  });
});
