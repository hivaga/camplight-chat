import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Common logic to run before each test
  await page.goto('/');
});



test('has main menu', async ({ page }) => {
  expect(await page.getByRole('link', { name: 'Home' })).toBeDefined();
  expect(await page.getByRole('link', { name: 'User' })).toBeDefined();
  expect(await page.getByRole('link', { name: 'Chat' })).toBeDefined();
});


test('navigate to User Page /user ', async ({ page }) => {
  const link = page.getByRole('link', { name: 'User' });
  await expect(link).toBeVisible();

  await Promise.all([page.waitForURL('/user'), link.click()]);
  expect(page.url()).toContain('/user');
});


test('navigate to Chat Page /chat ', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Chat' });
  await expect(link).toBeVisible();

  await Promise.all([page.waitForURL('/chat'), link.click()]);
  expect(page.url()).toContain('/chat');
});
