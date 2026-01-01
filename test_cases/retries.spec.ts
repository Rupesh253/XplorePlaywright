import { test } from '@playwright/test';
import { assert } from 'console';

test.describe('Retries Order Example[Not all pass Always]', () => {
  test.describe.configure({ retries: 2 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪First passes: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Second passes: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Third Fails', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Third Fails workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex} ❌`);
    throw new Error('a');
  });
  test('Fourth passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Fourth passes workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});
test.describe('Retries Order Example[Flaky]', () => {
  test.describe.configure({mode:'default', retries: 1 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach:        workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪First passes:    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Second passes:   workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Third Flaky', { tag: '@SMOKE' }, ({}, testInfo) => {
    if(testInfo.retry){
        console.log(`🔄 Retrying this test ${testInfo.title} on workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
    }
    const number=Math.ceil(Math.random()*10000);
    const isEven=number%2!=0;
    console.log(`🧪Third Flaky      workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex} [number]:${number} ${isEven?'❌':'✅'}`);
    if(isEven){
        throw new Error(`${number} is not odd number`);
    }
  });
  test('Fourth passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Fourth passes    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll:          workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});
test.describe('Retries Order Example[All Pass Always]', () => {
  test.describe.configure({ mode: 'parallel', retries: 1 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`First passes: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`Second passes: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Third passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`Third passes workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Fourth passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`Fourth passes workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll: workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});

//Serial
test.describe('Retries Order Example[Serial][Not all pass Always]', () => {
  test.describe.configure({ mode:'serial',retries: 2 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll:       workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach:      workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪First passes:  workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Second passes:  workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Third Fails', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Third Fails   workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex} ❌`);
    throw new Error('a');
  });
  test('Fourth passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Fourth passes  workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach:      workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll:       workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});
test.describe('Retries Order Example[Serial][Flaky]', () => {
  test.describe.configure({mode:'serial', retries: 1 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach:        workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪First passes:    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Second passes:   workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Third Flaky', { tag: '@SMOKE' }, ({}, testInfo) => {
    if(testInfo.retry){
        console.log(`🔄 Retrying this test ${testInfo.title} on workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
    }
    const number=Math.ceil(Math.random()*10000);
    const isEven=number%2!=0;
    console.log(`🧪Third Flaky      workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex} [number]:${number} ${isEven?'❌':'✅'}`);
    if(isEven){
        throw new Error(`${number} is not odd number`);
    }
  });
  test('Fourth passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Fourth passes    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll:          workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});
test.describe('Retries Order Example[Serial][All Pass Always]', () => {
  test.describe.configure({mode:'serial', retries: 1 });
  test.beforeAll('beforeAll', ({}, testInfo) => {
    console.log(`beforeAll:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.beforeEach('beforeEach', ({}, testInfo) => {
    console.log(`beforeEach:        workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('First1 passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪First1 passes:    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Second2 passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Second2 passes:   workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
 test('Third3 passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`Third3 passes    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test('Fourth4 passes', { tag: '@SMOKE' }, ({}, testInfo) => {
    console.log(`🧪Fourth4 passes    workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterEach('afterEach', ({}, testInfo) => {
    console.log(`afterEach:         workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
  test.afterAll('afterAll', ({}, testInfo) => {
    console.log(`afterAll:          workerIndex=${testInfo.workerIndex}, parallelIndex:${testInfo.parallelIndex}`);
  });
});
