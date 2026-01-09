import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from './../test_pages/pom_approach1/loginPage';

const adminAuthFile = path.resolve(path.join('playwright', '.auth', 'admin.json'));
const userAuthFile = path.resolve(path.join('playwright', '.auth', 'user.json'));

test.describe('Get the tokens', () => {
  test.describe.configure({ mode: 'serial' });
  test('Authenticate for Admin user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    await page.context().storageState({ path: adminAuthFile });
  });

  test('Authenticate for Normal user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('visual_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    await page.context().storageState({ path: userAuthFile });
  });

  test.describe('Admin Tests', () => {
    test.use({ storageState: adminAuthFile });
    test('Admin Test1', async ({ page }) => {
      console.log(`${adminAuthFile} set this up into local storage`);
      await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'load' });
    });
    test('Admin Test2', async ({ page }) => {
      console.log(`${adminAuthFile} set this up into local storage`);
      await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'load' });
    });
  });
  test.describe('User Tests', () => {
    test.use({ storageState: userAuthFile });
    test('User Test1', async ({ page }) => {
      console.log(`${userAuthFile} set this up into local storage`);
      await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'load' });
    });
    test('User Test2', async ({ page }) => {
      console.log(`${userAuthFile} set this up into local storage`);
      await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'load' });
    });
  });

  test.describe('Combined Test', () => {
    test('Complex Test1', async ({ browser }) => {
      const adminContext = await browser.newContext({ storageState: adminAuthFile });
      const adminPage = await adminContext.newPage();

      const userContext = await browser.newContext({ storageState: userAuthFile });
      const userPage = await userContext.newPage();

      await adminPage.goto('https://www.saucedemo.com/inventory.html',{ waitUntil: 'load' });
      await userPage.goto('https://www.saucedemo.com/inventory.html',{ waitUntil: 'load' });
    });
  });
});
