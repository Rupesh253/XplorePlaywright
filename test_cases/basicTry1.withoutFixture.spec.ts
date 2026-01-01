import { expect, test } from '@playwright/test';
import { AssertionError } from 'assert';
import { assert } from 'console';

test.describe('[TRY1]Scenario', () => {
  test.beforeAll('[TRY1]beforeAll', () => {
    console.log('[TRY1]beforeAll');
  });
  test.beforeEach('[TRY1]beforeEach', () => {
    console.log('[TRY1]beforeEach');
  });
  test('🧪[TRY1]Case1', () => {
    console.log('🧪[TRY1]Case1');
  });
  test('🧪[TRY1]Case2', () => {
    console.log('🧪[TRY1]Case2');
  });
  test.afterEach('[TRY1]afterEach', () => {
    console.log('[TRY1]afterEach');
  });
  test.afterAll('[TRY1]afterAll', () => {
    console.log('[TRY1]afterAll');
  });
});
