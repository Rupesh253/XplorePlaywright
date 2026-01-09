import { expect, test } from '@playwright/test';

test('ToolTips Testing', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tooltips', { waitUntil: 'networkidle' });
  await page.locator('button:has-text("Tooltip on top")').hover();
  await expect(page.locator('button:has-text("Tooltip on top")')).toHaveAccessibleDescription('Tooltip on top');
  //await expect(page.locator('button:has-text("Tooltip on top")')).toHaveAttribute('title','Tooltip on top');

  await page.locator('button:has-text("Tooltip on end")').hover();
  await expect(page.locator('button:has-text("Tooltip on end")')).toHaveAccessibleDescription('Tooltip on end');
  //await expect(page.locator('button:has-text("Tooltip on end")')).toHaveAttribute('title', 'Tooltip on end');

  await page.locator('button:has-text("Tooltip on bottom")').hover();
  await expect(page.locator('button:has-text("Tooltip on bottom")')).toHaveAccessibleDescription('Tooltip on bottom');
  //await expect(page.locator('button:has-text("Tooltip on bottom")')).toHaveAttribute('title','Tooltip on top');

  await page.locator('button:has-text("Tooltip on start")').hover();
  await expect(page.locator('button:has-text("Tooltip on start")')).toHaveAccessibleDescription('Tooltip on start');
  // await expect(page.locator('button:has-text("Tooltip on start")')).toHaveAttribute('title','Tooltip on start');

  await page.locator('button:has-text("Tooltip with HTML")').hover();
  await expect(page.locator('button:has-text("Tooltip with HTML")')).toHaveAccessibleDescription('Tooltip with HTML');
  //await expect(page.locator('button:has-text("Tooltip with HTML")')).toHaveAttribute('title','Tooltip with HTML');
});
