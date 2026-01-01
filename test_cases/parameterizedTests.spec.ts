import { expect, test } from '@playwright/test';
import { test as projectLevelTest } from './../test_auxiliaries/fixtures/parameterizeFixture.ts';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

//Test-level parameterized tests from in-file
[
  { a: 1, b: 2, expected: 3 },
  { a: -1, b: 0, expected: -1 },
  { a: 0, b: 0, expected: 0 },
].forEach(({ a, b, expected }) => {
  test(`Test-level parameterized tests:: Sum of ${a}+${b} is as ${expected}`, ({}) => {
    console.log(`Running...Sum of ${a}+${b} is as ${expected}`);
    expect(a + b).toEqual(expected);
  });
});

//Scenario-level parameterized tests from in-file
[
  { a: 1, b: 2, sum: 3, diff: -1, multiply: 2 },
  { a: -1, b: 0, sum: -1, diff: -1, multiply: -0 },
  { a: 0, b: 0, sum: 0, diff: 0, multiply: 0 },
].forEach(({ a, b, sum, diff, multiply }) => {
  test.describe('Scenario-level parameterized tests:: Arithmetic Operations', () => {
    test.beforeAll('beforeAll', () => {
      console.log(`[beforeAll]Running for {a:${a},b:${b}.sum:${sum},diff:${diff},multiply:${multiply}}`);
    });
    test.beforeEach('beforeEach', () => {
      console.log(`[beforeEach]Running for {a:${a},b:${b}.sum:${sum},diff:${diff},multiply:${multiply}}`);
    });
    test(`Sum of ${a}+${b} is as ${sum}`, ({}) => {
      console.log(`Running...Sum of ${a}+${b} is as ${sum}`);
      expect(a + b).toEqual(sum);
    });
    test(`Diff of ${a}-${b} is as ${diff}`, ({}) => {
      console.log(`Running...Diff of ${a}-${b} is as ${diff}`);
      expect(a - b).toEqual(diff);
    });
    test(`Multiply of ${a}*${b} is as ${multiply}`, ({}) => {
      console.log(`Running...Multiply of ${a}*${b} is as ${multiply}`);
      expect(a * b).toEqual(multiply);
    });
    test.afterEach('afterEach', () => {
      console.log(`[afterEach]Running for {a:${a},b:${b}.sum:${sum},diff:${diff},multiply:${multiply}}`);
    });
    test.afterAll('afterAll', () => {
      console.log(`[afterAll]Running for {a:${a},b:${b}.sum:${sum},diff:${diff},multiply:${multiply}}`);
    });
  });
});

//Test-level parameterized tests from out-file
const records = parse(fs.readFileSync(path.resolve(path.join('test_data', 'parameterizeData.csv'))), { columns: true, skip_empty_lines: true });
records.forEach((record)=>{
    test(`Parameterized test from csv for ${record.firstName} ${record.lastName}`,({})=>{
        console.log(`Parameterized test from csv for ${record.firstName},${record.middleName}`);
    });
});

//Project-level parameterized tests
projectLevelTest(`Project-level parameterized tests`, ({ person }) => {
  console.log(`Test for ${person}`);
});
