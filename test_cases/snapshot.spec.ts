import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Snapshot testing', () => {
  test.describe.configure({ retries: 1 });

  test('Aria Snapshot Testing', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
    await expect(page.locator('.login-box')).toMatchAriaSnapshot({ name: 'aria-Snapshot-Testing.aria.yml' });
    //from codegen: for aria snapshot
    await expect(page.locator('form')).toMatchAriaSnapshot(`
      - textbox "Username"
      - textbox "Password"
      - button "Login"
    `);
    await expect(page.locator('[data-test="login-credentials-container"]')).toMatchAriaSnapshot(`
      - heading "Accepted usernames are:" [level=4]
      - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
      - heading "Password for all users:" [level=4]
      - text: secret_sauce
    `);

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');
    //validating all inputs at once.
    await expect(page.locator('form')).toMatchAriaSnapshot(`
      - textbox "Username": standard_user
      - textbox "Password": secret_sauce
      - button "Login"
    `);

    await expect(page.locator('[data-test="login-credentials"]')).toContainText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user');
    await expect(page.locator('[data-test="login-credentials"]')).toMatchAriaSnapshot(`
      - heading "Accepted usernames are:" [level=4]
      - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
    `);

    await expect(page.locator('[data-test="login-password"]')).toContainText('Password for all users:secret_sauce');
    await expect(page.locator('[data-test="login-password"]')).toMatchAriaSnapshot(`
      - heading "Password for all users:" [level=4]
      - text: secret_sauce
    `);
  });

  test('Visual Snapshot Testing', async ({ page }) => {
    await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
    await expect(page.getByAltText('Playwright logo').first()).toHaveScreenshot('playwrightLogo.png', { animations: 'disabled', maxDiffPixelRatio: 0.5, mask: [], maskColor: '' });
    await expect(page.getByAltText('Browsers (Chromium, Firefox, WebKit)')).toHaveScreenshot('supportedBrowsers.png');
  });
  test('example test1', async ({ page }) => {
    await page.goto('https://playwright.dev');
    //First Run: error Error: A snapshot doesn't exist at test_cases/snapshot.spec.ts-snapshots/Snapshot-testing-example-test1-1-CHROMIUM-PROJECT-darwin.png, writing actual.
    //Second Run: pass
    await expect(page).toHaveScreenshot();
  });
});
