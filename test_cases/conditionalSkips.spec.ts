import { test } from '@playwright/test';
import { logger } from '../test_auxiliaries/logger';
import * as CONSTANTS from '../test_auxiliaries/constants';

test.describe.skip(`Test`, async () => {
  let errorStatus: boolean = false;
  test.beforeEach(`Setup`, async ({ page }, testInfo) => {
    const rand: number = Math.floor(Math.random() * 1000);
    console.log(rand);
    if (rand % 2 == 0) {
      errorStatus = false;
    } else {
      errorStatus = true;
    }
  });
  test(`Test1`, async ({ page }, testInfo) => {
    test.skip(errorStatus);
  });
  test(`Test2`, async ({ page }, testInfo) => {
    test.skip(errorStatus);
  });
  test(`Test3`, async ({ page }, testInfo) => {
    test.skip(errorStatus);
  });
  test(`Test4`, async ({ page }, testInfo) => {
    test.skip(errorStatus);
  });
});
