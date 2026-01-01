import { test as base } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({}, use) => {
      //BeforeEach
      console.log(`[Setup][Each] BeforeEach executed From fixture`);
      //Test
      await use();
      //AfterEach
      console.log(`[Teardown][Each] AfterEach executed from fixture`);
    },
    { auto: true },
  ],
});
