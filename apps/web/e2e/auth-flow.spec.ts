import { test, expect } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 렌더링된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '친구다치' })).toBeVisible();
    await expect(page.getByText('언어 장벽 없는 한일 친구 만들기')).toBeVisible();
  });

  test('Google 로그인 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();
  });
});

test.describe('OAuth Callback', () => {
  test('code가 있으면 기존 유저는 /home으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/auth/callback?code=existing-user-code');
    await expect(page).toHaveURL('/home');
  });

  test('code가 있으면 신규 유저는 /onboarding으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/auth/callback?code=new-user-code');
    await expect(page).toHaveURL('/onboarding');
  });

  test('code가 없으면 /로 리다이렉트된다', async ({ page }) => {
    await page.goto('/auth/callback');
    await expect(page).toHaveURL('/');
  });
});
