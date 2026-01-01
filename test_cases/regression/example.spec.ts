import { test } from '@playwright/test';

test('Regression Test Example', { tag: '@REGRESSION_TAG' }, ({}) => {
  console.log(`Regression Test Example running from regression project`);
});
