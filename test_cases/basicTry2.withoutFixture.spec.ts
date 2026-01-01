import { test } from '@playwright/test';

test.describe('[TRY2]Scenario', () => {
  test.beforeAll('[TRY2]beforeAll', () => {
    console.log('[TRY2]beforeAll');
  });
  test.beforeEach('[TRY2]beforeEach', () => {
    console.log('[TRY2]beforeEach');
  });
  test('🧪[TRY2]Case1', () => {
    console.log('🧪[TRY2]Case1');
  });
  test('🧪[TRY2]Case2', () => {
    console.log('🧪[TRY2]Case2');
  });
  test.afterEach('[TRY2]afterEach', () => {
    console.log('[TRY2]afterEach');
  });
  test.afterAll('[TRY2]afterAll', () => {
    console.log('[TRY2]afterAll');
  });
});
