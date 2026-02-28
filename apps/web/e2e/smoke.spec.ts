import { test, expect } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '친구다치' })).toBeVisible();
  });

  test('Google 로그인 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();
  });
});
