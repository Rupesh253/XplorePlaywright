import { expect, test } from '@playwright/test';
import { AssertionError } from 'assert';
import { assert } from 'console';


test.describe('Tags Example', () => {
  test.describe('Grouped Tags', { tag: '@group_tag' }, () => {
    test('Test1', () => {
      console.log(`Test1 have tags:@group_tag`);
    });
    test('Test2', () => {
      console.log(`Test2 have tags:@group_tag`);
    });
  });

  test.describe('Grouped Tags and Individual test tags', { tag: '@group_tag' }, () => {
    test('Test1', { tag: '@tag1_tag' }, () => {
      console.log(`Test1 have tags:@group_tag,@tag1_tag`);
    });
    test('Test2', { tag: ['@tag2.0_tag', '@tag2.1_tag'] }, () => {
      console.log(`Test2 have tags:@group_tag,@tag2.0_tag,@tag2.1_tag`);
    });
    test('Test3', () => {
      console.log(`Test3 have tags:@group_tag`);
    });
  });
});
