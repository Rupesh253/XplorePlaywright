import { expect, test } from '@playwright/test';
import { AssertionError } from 'assert';
import { assert } from 'console';


test.describe('Annotation Examples', () => {
  test.skip('Skipped Test', () => {
    console.log(`This test will be skipped.It won't run`);
  });
  test.fail('Looking for a case to get failed', () => {
    console.log(`This test will be executed and expected to fail`);
    expect(false).toBeTruthy();
  });
  test.fail('Looking for a case to get failed and Warn back', () => {
    console.log(`This test will be executed and passed which will be complained`);
    expect(true).toBeTruthy();
  });
  test.fixme('Required a fix for this', () => {
    console.log(`Need attention for this case since it have a problem`);
  });
  test('Conditional True Skip', () => {
    console.log(`Will execute`);
    test.skip(true === true);
    console.log(`Won't execute`);
  });
  test('Conditional False Skip', () => {
    console.log(`Will execute`);
    test.skip(false === true);
    console.log(`Will execute`);
  });
  test.describe.skip('Sub scenario for grouped skip', () => {
    test('Test1', () => {
      console.log('will be skipped');
    });
    test('Test2', () => {
      console.log('will be skipped');
    });
    test('Test3', () => {
      console.log('will be skipped');
    });
  });
  test.describe.fixme('Sub scenario for grouped fixme', () => {
    test('Test1', () => {
      console.log('will be skipped');
    });
    test('Test2', () => {
      console.log('will be skipped');
    });
    test('Test3', () => {
      console.log('will be skipped');
    });
  });
 
  test.describe('Custom Annotations', { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' } }, () => {
    test('Test1', () => {
      console.log(`Test1 { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' }`);
    });
    test('Test2', () => {
      console.log(`Test2 { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' }`);
    });
  });
  test.describe('Custom Annotations2', { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' } }, () => {
    test('Test1', { annotation: { type: 'Test_Annotation_Type', description: 'Test_Annotation_Description' } }, () => {
      console.log(`Test1 { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' } \n {annotation:{type:'Test_Annotation_Type',description:'Test_Annotation_Description'}`);
    });
    test(
      'Test2',
      {
        annotation: [
          { type: 'Test2.1_Annotation_Type', description: 'Test2.1_Annotation_Description' },
          { type: 'Test2.2_Annotation_Type', description: 'Test2.2_Annotation_Description' },
        ],
      },
      () => {
        console.log(
          `Test2 { annotation: { type: 'Scenario_Annotation_Type', description: 'Scenario_Annotation_Description' } \n { type: 'Test2.1_Annotation_Type', description: 'Test2.1_Annotation_Description' }\n{ type: 'Test2.2_Annotation_Type', description: 'Test2.2_Annotation_Description' }`,
        );
      },
    );
  });
  test('Runtime annotations', () => {
    test.info().annotations.push({ type: 'Runtime_Annotation_Type', description: new Date().toISOString().toString() });
  });
});
