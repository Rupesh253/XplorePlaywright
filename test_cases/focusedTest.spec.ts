 import {test} from '@playwright/test';

 test.describe('Focused Test', () => {
    test('UnFocused TestCase1', () => {
      console.log('will be skipped');
    });
    /*
    test.only('Focused TestCase', () => {
      console.log('this only will be executed');
    });
    */
    test('UnFocused TestCase2', () => {
      console.log('will be skipped');
    });
  });