import { test } from '@playwright/test';
import path from 'path';

test('Locators Example', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/locators', { waitUntil: 'domcontentloaded' });
  //unwanted overlays handler
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.addLocatorHandler(await page.locator('.toprow'), async () => {
    await page.locator('#dismiss-button').click();
  });
  await page.getByRole('button').filter({ hasText: 'Add Item' });
  await page.getByText('Hot Deal:').highlight();
  await page.getByLabel('Choose a country').selectOption('Japan');
  await page.getByLabel('Email for newsletter').fill('rupesh~`!#$%^&*()-_+={}[]|\;:@gmail.com');
  await page.getByPlaceholder('Search the site').fill('http://www.dodo.com');
  await page.getByPlaceholder('Filter by tag').fill('http://www.dodo.com');
  await page.getByAltText('User avatar').getByRole('img').highlight();
  await page.getByTitle('Refresh content').highlight();
  await page.getByTestId('status-message').highlight();
  //css
  await page.locator('css=.legacy-css').highlight();
  await page.locator('.legacy-css').highlight();
  //css:pseudoClasses
  await page.locator('button:text("Add")').highlight();
  await page.locator('button:text(" Add ")').highlight();
  await page.locator('button:text("Item")').highlight();
  await page.locator('button:text("  add item  ")').highlight();

  await page.locator('button:has-text("Add")').highlight();
  await page.locator('button:has-text(" Add ")').highlight();
  await page.locator('button:has-text("Item")').highlight();
  await page.locator('button:has-text(" add item ")').highlight();

  await page.locator('button:text-is("Add Item")').highlight();

  await page.locator('button:text-matches("Adds*Item","i")').highlight();

  await page.locator('button:visible:text("Add")').highlight();
  await page.locator(':visible').highlight();

  await page.locator('a:visible').nth(3).highlight();
  await page.locator('a >> nth=4').highlight();

  await page.locator('.page-layout >> h1').highlight();
  await page.locator('.page-layout').locator('h1').highlight();

  //xpath //deeplinking //chaining //filtering
  await page
    .locator('xpath=//tr')
    .filter({ hasText: /Headphones/i })
    .locator('xpath=//td[2]')
    .highlight();
  await page
    .locator('//tr')
    .filter({ hasText: /Headphones/i })
    .locator('//td[3]')
    .highlight();

  const inputValueByPlaceholder = await page.getByPlaceholder('Search the site').inputValue();
  console.log(`inputValueByPlaceholder:${inputValueByPlaceholder}`);

  const selectedOption = await page.getByLabel('Choose a country').inputValue();
  console.log(`selectedOption:${selectedOption}`);

  const inputValueByLabel = await page.getByLabel('Email for newsletter').inputValue();
  console.log(`inputValueByLabel:${inputValueByLabel}`);

  const textOfLabel = await page.locator('h4').nth(0).innerText();
  console.log(`textOfLabel:${textOfLabel}`);

  await page.getByLabel('Email for newsletter').screenshot({ path: path.resolve(path.join('test_output', 'elementScreenshot.png')) });
  await page.screenshot({ path: path.resolve(path.join('test_output', 'pageScreenshot.png')) });
  await page.screenshot({ fullPage: true, path: path.resolve(path.join('test_output', 'completePageScreenshot.png')) });
  await page.screenshot({ fullPage: true, type: 'jpeg', path: path.resolve(path.join('test_output', 'completePageScreenshot.jpeg')) });
  await page.screenshot({
    fullPage: true,
    type: 'jpeg',
    animations: 'allow',
    mask: [ page.getByPlaceholder('Search the site'),  page.getByLabel('Choose a country')],
    path: path.resolve(path.join('test_output', 'defaultMaskedPageScreenshot.jpeg')),
  });
   await page.screenshot({
    fullPage: true,
    type: 'jpeg',
    animations: 'allow',
    mask: [ page.getByPlaceholder('Search the site'),  page.getByLabel('Choose a country')],
    maskColor:'#0000FF',
    omitBackground:true,
    quality:95,
    path: path.resolve(path.join('test_output', 'blueMaskedPageScreenshot.jpeg')),
  });
   await page.getByLabel('Email for newsletter').screenshot({
    type: 'jpeg',
    animations: 'allow',
    omitBackground:true,
    quality:95,
    caret:'hide',
    path: path.resolve(path.join('test_output', 'hideCaretElementScreenshot.jpeg')),
  });


  await page.screenshot({ fullPage: true, clip: { x: 5, y: 5, width: 500, height: 500 }, path: path.resolve(path.join('test_output', 'clipPageScreenshot.png')) });
});
