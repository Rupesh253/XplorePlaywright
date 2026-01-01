import { test } from '@playwright/test';

test.describe('Timeouts', () => {
  test('🧪Normal test', () => {
    console.log('🧪Normal test');
  });
  test('🧪Slow test', () => {
    test.slow(); // 3X timeouts
    console.log('🧪Slow test');
  });
  test('🧪Very slow test', () => {
    test.setTimeout(120_000);
    console.log('🧪very Slow test');
  });
});
