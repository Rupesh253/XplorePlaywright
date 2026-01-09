import { test, expect } from '@playwright/test';

test('Request Abort', async ({ page }) => {
  await page.route('**/*.png', async (route) => {
    route.abort();
  });
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  await expect(page.locator('css=img[src="img/logos/Browsers.png"]')).toContainText('Browsers (Chromium, Firefox, WebKit)');
});

test('Request Fulfill', async ({ page }) => {
  await page.route('**/*.png', async (route) => {
    route.fulfill();
  });
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  //await expect(page.locator('css=img[src="img/logos/Browsers.png"]')).toContainText('Browsers (Chromium, Firefox, WebKit)');

  await page.route('**/*.png', async (route) => {
    route.continue();
  });
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  await expect(page.locator('css=img[src="img/logos/Browsers.png"]')).not.toContainText('Browsers (Chromium, Firefox, WebKit)');

  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [];
    await route.fulfill({ json });
  });
  await page.goto('https://demo.playwright.dev/api-mocking/', { waitUntil: 'load' });

  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [{ name: 'Grapes', id: 1 }];
    await route.fulfill({ json });
  });
  await page.goto('https://demo.playwright.dev/api-mocking/', { waitUntil: 'load' });

  await page.route('*/**/api/v1/fruits', async (route) => {
    const response = await route.fetch();
    const json =await response.json();
    json.push({name:'[FULFILL]Grapes',id:5333});
    await route.fulfill({json});
  });
  await page.goto('https://demo.playwright.dev/api-mocking/', { waitUntil: 'load' });
});

test('Request Fetch', async ({ page }) => {
  await page.route('**/img/logos/Browsers.png', async (route) => {
    const response = await route.fetch();
    console.log(`${JSON.stringify(response)}`);
  });
  await page.goto('https://playwright.dev/', { waitUntil: 'domcontentloaded' });
});

