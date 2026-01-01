import { expect, test } from '@playwright/test';
import { AssertionError } from 'assert';
import { assert } from 'console';

test.describe('Light mode tests',()=>{
  test.use({colorScheme:'light'});
  test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test.afterEach('',async ({page})=>{
  await page.close();
});
});
