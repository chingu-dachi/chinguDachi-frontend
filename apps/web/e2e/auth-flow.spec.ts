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

test.describe('AuthGuard 세션', () => {
  test('인증된 상태에서 페이지 새로고침 시 세션이 유지된다', async ({ page }) => {
    await page.goto('/auth/callback?code=existing-user-code');
    await expect(page).toHaveURL('/home');
    await page.reload();
    await expect(page).toHaveURL('/home');
  });

  test('비인증 유저가 /home 접근 시 /로 리다이렉트된다', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL('/');
  });

  test('refresh 실패 시 랜딩으로 리다이렉트된다', async ({ page }) => {
    await page.route('**/api/users/me', (route) =>
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Unauthorized' },
        }),
      }),
    );
    await page.route('**/api/auth/refresh', (route) =>
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Refresh failed' },
        }),
      }),
    );
    await page.goto('/home');
    await expect(page).toHaveURL('/');
  });
});
