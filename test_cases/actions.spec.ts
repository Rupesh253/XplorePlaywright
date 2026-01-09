import { expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('File Upload', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/upload');
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#fileInput').setInputFiles(path.resolve(path.join('test_data', 'file1.txt')));
  await page.locator('#fileSubmit').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('h1').getByText(/File Uploaded/i)).toBeVisible();
  await expect(page.locator('#uploaded-files')).toContainText('file1.txt');

  await page.goto('https://practice.expandtesting.com/upload');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#fileInput').setInputFiles(path.resolve(path.join('test_data', 'file1.txt')));
  //override
  await page.locator('#fileInput').setInputFiles(path.resolve(path.join('test_data', 'file2.txt')));
  //removing
  await page.locator('#fileInput').setInputFiles([]);
});
test('File Download', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/download', { waitUntil: 'domcontentloaded' });
  //register the download event>download>wait for promise>get a fileName>save the file>assert > delete
  const downloadEvent = page.waitForEvent('download');
  await page.getByText('PetrolDec2025.pdf').first().click();
  const downloadPromise = await downloadEvent;
  const bestFilePath = path.resolve(path.join(__dirname, downloadPromise.suggestedFilename()));
  await downloadPromise.saveAs(bestFilePath);

  expect(fs.existsSync(bestFilePath)).toBeTruthy();
  fs.unlinkSync(bestFilePath);
  expect(fs.existsSync(bestFilePath)).toBeFalsy();
});
test('Dialogs ', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/js-dialogs', { waitUntil: 'domcontentloaded' });
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });

  page.once('dialog', async (alert) => {
    console.log('\x1b[32m ➡️ [SUBSCRIBE] Event ON once\x1b[0m');
    console.log(`type:${alert.type()},message:${alert.message()}, accept:yes`);
    await alert.accept();
    console.log('\x1b[31m ⬅️ [UNSUBSCRIBE] Event OFF once\x1b[0m');
  });

  await page.locator('#js-alert').click();
  console.log(`_____________________________________________________________`);

  page.once('dialog', async (alert) => {
    console.log('\x1b[32m ➡️ [SUBSCRIBE] Event ON once\x1b[0m');
    console.log(`type:${alert.type()},message:${alert.message()}, accept:yes`);
    await alert.accept();
    console.log('\x1b[31m ⬅️ [UNSUBSCRIBE] Event OFF once\x1b[0m');
  });
  await page.locator('#js-confirm').click();
  console.log(`_____________________________________________________________`);
  page.once('dialog', async (alert) => {
    console.log('\x1b[32m ➡️ [SUBSCRIBE] Event ON once\x1b[0m');
    console.log(`type:${alert.type()},message:${alert.message()}, dismiss:yes`);
    await alert.dismiss();
    console.log('\x1b[31m ⬅️ [UNSUBSCRIBE] Event OFF once\x1b[0m');
  });
  await page.locator('#js-confirm').click();
  console.log(`_____________________________________________________________`);
  const dialogHandler = async (alert) => {
    console.log('\x1b[32m ➡️ [SUBSCRIBE] Event ON always\x1b[0m');
    console.log(`type:${alert.type()},message:${alert.message()},prompt: yes`);
    await alert.accept('promptText');
  };
  page.on('dialog', dialogHandler);
  await page.locator('#js-prompt').click();
  page.off('dialog', dialogHandler);
  console.log(`\x1b[31m ⬅️ [UNSUBSCRIBE] Event OFF - handler removed successfully\x1b[0m`);

  page.once('dialog', async (alert) => {
    console.log(`New dialog appeared after removing handler: type:${alert.type()},message:${alert.message()},prompt: yes`);
    await alert.dismiss();
  });
  await page.locator('#js-prompt').click();
});
test('Dropdowns Example', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo', { waitUntil: 'domcontentloaded' });
  //single select
  await page.locator('#select-demo').selectOption('Monday');
  await expect(page.locator('.selected-value')).toContainText('Monday');

  await page.locator('#select-demo').selectOption({ label: 'Tuesday' });
  await expect(page.locator('.selected-value')).toContainText('Tuesday');

  await page.locator('#select-demo').selectOption({ value: 'Wednesday' });
  await expect(page.locator('.selected-value')).toContainText('Wednesday');

  await page.locator('#select-demo').selectOption({ index: 1 });
  await expect(page.locator('.selected-value')).toContainText('Sunday');

  //multi-select
  await page.locator('#multi-select').selectOption([{ label: 'Florida' }, { value: 'New York' }, { index: 6 }, { label: 'Washington' }]);

  await page.locator('#printMe').click();
  //await expect(page.getByText(/First selected option is/i)).toContainText('Florida');

  await page.locator('#printAll').click();
  //await expect(page.getByText(/Last selected option is/i)).toContainText('Washington');
});

test('Hover Example', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/hovers', { waitUntil: 'domcontentloaded' });
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.addLocatorHandler(await page.locator('#ad_position_box'), async () => {
    await page.locator('.close-button').click();
  });
  await page.getByTestId('img-user-1').hover();
  await expect(page.getByText('user1')).toBeVisible();
  await page
    .getByText(/view profile/i)
    .filter({ visible: true })
    .click();
  await expect(page.getByText(/welcome user1/i)).toBeVisible();
});

test('Drag&Drop Example', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/drag-and-drop', { waitUntil: 'domcontentloaded' });
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.addLocatorHandler(await page.locator('#ad_position_box'), async () => {
    await page.locator('.close-button').click();
  });
  //direct way
  await page
    .locator('#column-a')
    .filter({ has: page.getByText('A') })
    .dragTo(await page.locator('#column-b').filter({ has: page.getByText('B') }));
  await expect(page.locator('#column-a').filter({ has: page.getByText('B') })).toBeAttached();
  await expect(page.locator('#column-b').filter({ has: page.getByText('A') })).toBeAttached();
  //indirect way
  await page.locator('#column-a').hover();
  await page.mouse.down();
  await page.locator('#column-b').hover();
  await page.mouse.up();
  await expect(page.locator('#column-a').filter({ has: page.getByText('A') })).toBeAttached();
  await expect(page.locator('#column-b').filter({ has: page.getByText('B') })).toBeAttached();
});

test('Input Examples', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs', { waitUntil: 'domcontentloaded' });
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.addLocatorHandler(await page.locator('#ad_position_box'), async () => {
    await page.locator('.close-button').click();
  });

  await page.locator('#input-number').fill('253');
  await page.locator('#input-text').fill('rupesh');
  await page.locator('#input-text').clear();
  await page.locator('#input-text').focus();
  await page.locator('#input-text').pressSequentially('rupesh', { delay: 200 });
  await page.locator('#input-text').hover();
  await page.locator('#input-text').focus();
  await page.locator('#input-text').press('Enter');
  await page.locator('#input-password').fill('253@password');
  await page.locator('#input-date').fill('2026-01-02');
  await page.locator('#btn-display-inputs').click();
  await expect(page.locator('#output-number')).toHaveText('253');
  await expect(page.locator('#output-text')).toHaveText('rupesh');
  await expect(page.locator('#output-password')).toHaveText('253@password');
  await expect(page.locator('#output-date')).toHaveText('2026-01-02');
});

test('Evaluate Examples', async ({ page }) => {
  const pageReadiness = await page.evaluate('document.readyState;');
  console.log(`pageReadiness:${pageReadiness}`);

  const userAgent = await page.evaluate('window.clientInformation.userAgent');
  console.log(`userAgent:${userAgent}`);

  const arrayLength = await page.evaluate((array) => array.length, [1, 2, 3]);
  console.log(`arrayLength:${arrayLength}`);

  await page.evaluate(() => {
    console.log('running something here....');
  });
});
