import { test as base } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }, { forEachWorker: void }>({
  forEachTest: [
    async ({}, use) => {
      console.log(`______________________________🟩START EACH🟩______________________________`);
      //console.log(`🚀[Combined][Setup][Each] executed from combined fixture`);
      await use();
      //console.log(`🔚[Combined][Teardown][Each] executed from combined fixture`);
      console.log(`______________________________🟥STOP EACH🟥______________________________`);
    },
    { scope: 'test', auto: true },
  ],
  forEachWorker: [
    async ({}, use) => {
      console.log(`⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ 🟩START ALL🟩 ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ `);
      //console.log(`🚀[Combined][OneTimeSetup][All] executed from combined fixture`);
      await use();
      //console.log(`🔚[Combined][OneTimeTeardown][All] executed from combined fixture`);
      console.log(`⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ 🟥STOP ALL🟥 ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ ⚙️ `);
    },
    { scope: 'worker', auto: true },
  ],
});
