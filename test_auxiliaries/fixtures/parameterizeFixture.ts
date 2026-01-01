import { test as base } from '@playwright/test';

export type TestOptions = {
  person: string;
};
export const test = base.extend<TestOptions>({
  person: ['DefaultValue1',{option:true}],
});

