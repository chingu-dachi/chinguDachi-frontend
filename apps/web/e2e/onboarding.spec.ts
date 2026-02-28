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
    // 업로드 성공 → Avatar에 img가 렌더링됨 (mock CDN URL)
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
