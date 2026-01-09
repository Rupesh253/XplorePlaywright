import { test } from '@playwright/test';

test('Page Events', async ({ page }) => {
  const acceptHandler = async (alert) => {
    console.log(`type:${alert.type()},message:${alert.message()} from acceptHandler`);
    alert.accept();
  };
  const dismissHandler = async (alert) => {
    console.log(`type:${alert.type()},message:${alert.message()} from dismissHandler`);
    alert.dismiss();
  };

  const promptHandler = async (alert) => {
    console.log(`type:${alert.type()},message:${alert.message()} from promptHandler`);
    alert.accept('Rupesh');
  };
  page.once('dialog', acceptHandler);
  await page.evaluate('alert("Simple alert")');

  page.once('dialog', acceptHandler);
  await page.evaluate('confirm("Confirmation alert")');

  page.once('dialog', dismissHandler);
  await page.evaluate('confirm("Confirmation alert")');

  page.once('dialog', promptHandler);
  await page.evaluate('prompt("Prompt alert")');

  page.once('dialog', promptHandler);
  await page.evaluate('prompt("Prompt alert","defualtValue")');

  const loadEvent = page.waitForEvent('load');
  await page.goto('https://playwright.dev/', { waitUntil: 'load' });
  const loadPromise = await loadEvent;
  console.log(`${loadPromise}`);

  const pngRequest = page.waitForRequest('**/*.png');
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  const pngPromise = await pngRequest;
  console.log(`pngPromise:${pngPromise.url()}`);

  const svgRequest = page.waitForRequest('**/*.svg');
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  const svgPromise = await svgRequest;
  console.log(`svgPromise:${svgPromise.url()}`);

  const jpgRequest = page.waitForRequest('**/*.jpg');
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  const jpgPromise = await jpgRequest;
  console.log(`jpgPromise:${jpgPromise.url()}`);

  const requestSentHandler = async (request) => {
    console.log(`${request.url()} request sent`);
  };
  const requestFinishedHandler = async (request) => {
    console.log(`${request.url()} request finished`);
  };
  const responseHandler = async (reponse) => {
    console.log(`response came`);
  };
  page.on('request', requestSentHandler);
  page.on('requestfinished', requestFinishedHandler);
  page.on('response', responseHandler);
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.removeAllListeners();

  await page.on('pageerror', async (page) => {
    console.log(`\x1b[31m pageerros=>\n cause: ${await page.cause},\n message: ${page.message},\n name: ${page.name},\n stack: ${page.stack} \x1b[0m`);
  });
  await page.goto('https://practice.expandtesting.com/javascript-error',{waitUntil:'networkidle'});

});

test('Navigation Events', async ({ page }) => {
  page.once('domcontentloaded', async (page) => {
    console.log(`page is [domcontentloaded]`);
  });
  page.once('load', async (page) => {
    console.log(`page is [load]`);
  });
  page.on('request', (request) => console.log('>>', request.method(), request.url()));
  page.on('response', (response) => console.log('<<', response.status(), response.url()));
  page.on('websocket', (ws) => {
    console.log(`[websocket]>>WS opened:${ws.url()}`);
    ws.on('socketerror', () => {
      console.log(`[WS][socketerror]>>Socket error`);
    });
    ws.on('framereceived', (event) => console.log(`[WS][framereceived]>>${event.payload}`));
    ws.on('framesent', (event) => console.log(`[WS][framesent]>>${event.payload}`));
    ws.on('close', () => console.log(`[WS][close]>>ws closed`));
  });

  await page.goto('https://react.dev/learn/typescript', { waitUntil: 'networkidle' });
});

test('Browser,Context,Page Events', async ({ browser }) => {
  browser.on('disconnected', async () => {
    console.log(`\x1b[31m [BROWSER][disconnected] \x1b[0m`);
  });
  const context = await browser.newContext();
  context.on('page', (page) => {
    page.on('domcontentloaded', async () => {
      console.log(`\x1b[35m [CONTEXT][PAGE][domcontentloaded] New page created: ${await page.title()} \x1b[0m`);
    });
    page.on('load', async () => {
      console.log(`\x1b[34m [CONTEXT][PAGE][load] New page created: ${await page.title()} \x1b[0m`);
    });
    page.on('console', async () => {
      console.log(`\x1b[33m [CONTEXT][PAGE][console] \x1b[0m`);
    });
    page.on('close', async () => {
      console.log(`\x1b[31m [CONTEXT][PAGE][close] context have these pages:${context.pages().length} \x1b[0m`);
    });
  });
  context.on('console', () => {
    console.log(`\x1b[33m [CONTEXT][console] printing.... \x1b[0m`);
  });
  context.once('close', async () => {
    console.log(`\x1b[31m [CONTEXT][close] context have these pages:${context.pages().length} \x1b[0m`);
  });

  const page1 = await context.newPage();
  const page2 = await context.newPage();
  page1.once('domcontentloaded', async () => {
    console.log(`\x1b[35m [PAGE1][domcontentloaded] ${await page1.title()} \x1b[0m`);
  });
  page1.once('load', async () => {
    console.log(`\x1b[34m [PAGE1][load] ${await page1.title()} \x1b[0m`);
  });
  page1.on('console', async () => {
    console.log(`\x1b[33m [PAGE1][console] printing.... \x1b[0m`);
  });
  page1.once('close', async () => {
    console.log(`\x1b[31m [PAGE1][close] \x1b[0m`);
  });

  page2.once('domcontentloaded', async () => {
    console.log(`\x1b[35m [PAGE2][domcontentloaded] ${await page2.title()} \x1b[0m`);
  });
  page2.once('load', async () => {
    console.log(`\x1b[34m [PAGE2][load] ${await page2.title()} \x1b[0m`);
  });
  page2.on('console', async () => {
    console.log(`\x1b[33m [PAGE2][console] printing.... \x1b[0m`);
  });
  page2.once('close', async () => {
    console.log(`\x1b[31m [PAGE2][close] \x1b[0m`);
  });

  await page1.goto('https://practice.expandtesting.com/', { waitUntil: 'load' });
  console.log(`await page1.evaluate('document.readyState'): ${await page1.evaluate('document.readyState')}`);

  await page2.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
  console.log(`await page2.evaluate('document.readyState'): ${await page2.evaluate('document.readyState')}`);

  const page3 = await context.newPage();
  page3.once('close', async () => {
    console.log(`\x1b[31m [PAGE3][close] \x1b[0m`);
  });
  //await page3.goto('https://playwright.dev/', { waitUntil: 'domcontentloaded' });
  console.log(`Context has ${context.pages().length} pages total`);
});
