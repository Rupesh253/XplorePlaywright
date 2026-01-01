import { test as base } from '@playwright/test';

export const test = base.extend<{}, { forEachWorker: void }>({
  forEachWorker: [
    async ({}, use) => {
      //BeforeAll
      console.log(`[OneTimeSetup][All] BeforeAll executed from fixture: WI=${test.info().workerIndex}`);
      //Test
      await use();
      //AfterAll
      console.log(`[OneTimeTeardown][All] AfterAll executed from fixture:`);
    },
    { scope: 'worker', auto: true },
  ],
});
