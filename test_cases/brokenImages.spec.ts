import { test, request } from '@playwright/test';
import { url } from 'inspector';

test.describe('Broken Images', () => {
  test('Broken Images1', async ({ page, request }) => {
    await page.goto('https://practice.expandtesting.com/broken-images   ', { waitUntil: 'networkidle' });
    const imgElements = await page.locator('.page-layout img').all();

    const pageUrl = await page.url();
    const urlObject = new URL(pageUrl);
    const baseUrl = urlObject.origin;
    console.log(`host:${urlObject.host} \n hostname:${urlObject.hostname} \n href:${urlObject.href}`);
    console.log(`origin:${urlObject.origin} \n password:${urlObject.password} \n pathname:${urlObject.pathname}`);
    console.log(`port:${urlObject.port} \n protocol:${urlObject.protocol} \n search:${urlObject.search}`);
    console.log(`searchParams:${urlObject.searchParams} \n username:${urlObject.username}`);
    let brokenImages: string[] = [];
    let notBrokenImages: string[] = [];
    for (const img of imgElements) {
      let src = await img.getAttribute('src');
      src = src?.includes(baseUrl) ? src : `${baseUrl}/${src}`;
      const response = await request.get(`${src}`, {});
      const statusCode = response.status();
      console.log(`\x1b[30m src: ${src} =>response: ${statusCode}`);
      if (statusCode < 200 || statusCode > 299) {
        brokenImages.push(`${src}`);
      } else {
        notBrokenImages.push(`${src}`);
      }
    }
    console.log('brokenImages:');
    brokenImages.forEach((img) => {
      console.log(`\x1b[31m src: ${img} \x1b[0m`);
    });
    console.log('notBrokenImages:');
    notBrokenImages.forEach((img) => {
      console.log(`\x1b[32m src: ${img} \x1b[0m`);
    });
  });
  test('Broken Images2', async ({ page, request }) => {
    let brokenImages: string[] = [];
    let notBrokenImages: string[] = [];
    page.on('response', async (response) => {
      const request = response.request();
      //Contains the request's resource type as it was perceived by the rendering engine. ResourceType will be one of the following:
      // document, stylesheet, image, media, font, script, texttrack, xhr, fetch, eventsource, websocket, manifest, other.
      if (request.resourceType() == 'image') {
        if (response.status() < 200 || response.status() >= 300) {
          brokenImages.push(request.url());
        } else {
          notBrokenImages.push(request.url());
        }
      }
    });

    await page.goto('https://practice.expandtesting.com/broken-images   ', { waitUntil: 'networkidle' });
    console.log('brokenImages:');
    brokenImages.forEach((img) => {
      console.log(`\x1b[31m src: ${img} \x1b[0m`);
    });
    console.log('notBrokenImages:');
    notBrokenImages.forEach((img) => {
      console.log(`\x1b[32m src: ${img} \x1b[0m`);
    });
  });
});
