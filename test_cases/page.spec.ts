import { chromium, firefox, test, webkit } from '@playwright/test';
import path from 'path';

test('Pages Example[One Browser-One Context-Many Pages]', async ({ browser }) => {
  const context = await browser.newContext();

  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto('https://practice.expandtesting.com/', { waitUntil: 'load' });
  console.log(`await page1.evaluate('document.readyState'): ${await page1.evaluate('document.readyState')}`);

  await page2.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
  console.log(`await page2.evaluate('document.readyState'): ${await page2.evaluate('document.readyState')}`);
  const page3 = await context.newPage();
  console.log(`blank pageTitle:${(await page3.title()) == '' ? 'blank=>displayed as about:blank' : 'notblank'}`);
});

test('Pages Example[Many Browsers-Many Context-Many Pages]', async ({}) => {
  const chromiumBrowser = await chromium.launch();
  const chromiumContext = await chromiumBrowser.newContext();
  const chromiumPage1 = await chromiumContext.newPage();
  const chromiumPage2 = await chromiumContext.newPage();

  const firefoxBrowser = await firefox.launch();
  const firefoxContext = await firefoxBrowser.newContext();
  const firefoxPage1 = await firefoxContext.newPage();
  const firefoxPage2 = await firefoxContext.newPage();

  const webkitBrowser = await webkit.launch();
  const webkitContext = await webkitBrowser.newContext();
  const webkitPage1 = await webkitContext.newPage();
  const webkitPage2 = await webkitContext.newPage();

  //one window with 2 tabs
  await chromiumPage1.goto('https://practice.expandtesting.com/', { waitUntil: 'networkidle' });
  await chromiumPage2.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
  //2 windows with 1 tab
  await firefoxPage1.goto('https://practice.expandtesting.com/', { waitUntil: 'networkidle' });
  await firefoxPage2.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
  //2 windows with 1 tab
  await webkitPage1.goto('https://practice.expandtesting.com/', { waitUntil: 'networkidle' });
  await webkitPage2.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
});

test('New tab Example', async ({ browser }) => {
  const context = await browser.newContext();
  context.on('page', async (page) => {
    await page.waitForLoadState('networkidle');
    console.log(`[CONTEXT] pageTitle:${await page.title()}, pageURL:${await page.url()}`);
  });

  const firstPage = await context.newPage();
  firstPage.on('popup', async (page) => {
    console.log(`[popup] pageTitle:${await page.title()}, pageURL:${await page.url()}`);
  });

  await firstPage.goto('https://practice.expandtesting.com/windows', { waitUntil: 'networkidle' });

  const secondPageEvent = context.waitForEvent('page');
  await firstPage.locator('a:has-text("Click Here")').click();
  const secondPage = await secondPageEvent;
  await secondPage.waitForLoadState('networkidle');
  type pageInfo = { url: string; title: string };
  let tableData: pageInfo[] = [];

  for (const page of context.pages()) {
    //console.log(`pagesource:${await page.content()}`);
    tableData.push({ url: page.url(), title: (await page.title()).trim() });
  }
  console.table(tableData);
  await firstPage.bringToFront();
  await firstPage.locator('a:has-text("Click Here")').highlight();
  await secondPage.bringToFront();
  await secondPage.locator('h1:visible').highlight();
  await secondPage.locator('h1:visible').evaluate((e) => {
    e.style.display = 'inline-block';
    e.style.backgroundColor = 'red';
    e.style.color = 'blue';
    e.style.fontSize = '128px';
  });
  await secondPage.pause();
  await context.removeAllListeners();
});

test('Frames', async ({ page }) => {
  page.on('frameattached', async (page) => {
    console.log(`[PAGE][frameattached]`);
  });
  page.on('framedetached', async (page) => {
    console.log(`[PAGE][framedetached]`);
  });
  page.on('framenavigated', async (page) => {
    console.log(`[PAGE][framenavigated]`);
  });
  await page.goto('https://the-internet.herokuapp.com/nested_frames', { waitUntil: 'load' });

  for (const frame in page.frames()) {
    console.log(`${frame}`);
  }

  const css = `
        body {
	background-color: #f8f9fa !important;
	padding: 15px !important;
	border-radius: 10px !important;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1) !important;
}

body::after {
	content: "Applied stylings here" !important;
	display: block !important;
	margin-top: 10px !important;
	font-weight: bold !important;
	color: #007bff !important;
}
      `;
  const framesList = ['frame-left', 'frame-middle', 'frame-right', 'frame-bottom'];
  for (const frame of framesList) {
    const currentFrame = page.frame({ name: frame });
    if (currentFrame) {
      await currentFrame.addStyleTag({
        url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      });
      await currentFrame.addStyleTag({
        content: css,
      });
    }
    console.log(`Applied css for ${frame}`);
  }
});

test('Modal Dialog', async ({ page }) => {
  page.on('popup', async (page) => {
    console.log(`[popup]`);
  });
  page.on('dialog', async (page) => {
    console.log(`[dialog]`);
  });
  await page.goto('https://practice.expandtesting.com/entry-ad', { waitUntil: 'networkidle' });
  await page.locator('#close-modal-btn').click();
});

test('Scrollbars', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/scrollbars', { waitUntil: 'networkidle' });
  await page.locator('.row>div').filter({ hasText: 'Playground' }).locator('div').nth(0).hover();
  //auto-scroll
  await page.locator('#hidingButton').scrollIntoViewIfNeeded();

  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.row>div').filter({ hasText: 'Playground' }).locator('div').nth(0).hover();
  await page.mouse.wheel(200, 0);
  await page.mouse.wheel(0, 100); //=>await page.mouse.wheel(200,100);
  //await page.keyboard.press('ArrowDown');
  //await page.waitForTimeout(5000);
  //await page.keyboard.press('ArrowRight');
  //await page.waitForTimeout(5000);
});

test('Context Menus', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/jqueryui/menu#', { waitUntil: 'networkidle' });
  await page.locator('a:has-text("Enabled")').hover();
  await page.locator('a:has-text("Downloads")').hover();
  await page.locator('a:has-text("PDF")').hover();

  const downloadEvent = page.waitForEvent('download');
  await page.locator('a:has-text("PDF")').click();
  const downloadPromise = await downloadEvent;
  const fileName = path.join('test_output', downloadPromise.suggestedFilename());
  await downloadPromise.saveAs(fileName);
  console.log(`FileDownloaded from ${downloadPromise.url()} & savedAs @${fileName}`);

  await page.locator('a:has-text("Disabled")').hover();
  await page
    .locator('a:has-text("Disabled")')
    .click()
    .catch((e) => {
      console.log(`[catch] an error:`);
    })
    .then(() => {
      console.log(`[then] block executing...`);
    })
    .finally(() => {
      console.log(`[finally] block executing...`);
    });
});
