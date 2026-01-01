
import { test as allFixtureTest } from '../test_auxiliaries/fixtures/allFixture.ts';
import { test as eachFixtureTest } from '../test_auxiliaries/fixtures/eachFixture.ts';
import { test as combinedTest } from '../test_auxiliaries/fixtures/combinedFixture.ts';

allFixtureTest.describe('[All] Worker-Scoped Fixture Scenario', () => {
  allFixtureTest('🧪[Test1][All] All Fixture Example', () => {
    console.log(`🧪[Test1][All] executed here: WI=${allFixtureTest.info().workerIndex}`);
  });
  allFixtureTest('🧪[Test2][All] All Fixture Example', () => {
    console.log(`🧪[Test2][All] executed here: WI=${allFixtureTest.info().workerIndex}`);
  });
  allFixtureTest('🧪[Test3][All] All Fixture Example', () => {
    console.log(`🧪[Test3][All] executed here: WI=${allFixtureTest.info().workerIndex}`);
  });
  allFixtureTest('🧪[Test4][All] All Fixture Example', () => {
    console.log(`🧪[Test4][All] executed here: WI=${allFixtureTest.info().workerIndex}`);
  });
});

 allFixtureTest('🧪[Test5][All] All Fixture Example', () => {
    console.log(`🧪[Test5][All] executed here: WI=${allFixtureTest.info().workerIndex}`);
  });



eachFixtureTest.describe('[Each] Test-Scoped Fixture Scenario',()=>{
eachFixtureTest('🧪[Test1][Each] Each Fixture Example', () => {
  console.log(`🧪[Test1][Each] executed here`);
});
eachFixtureTest('🧪[Test2][Each] Each Fixture Example', () => {
  console.log(`🧪[Test2][Each] executed here`);
});
eachFixtureTest('🧪[Test3][Each] Each Fixture Example', () => {
  console.log(`🧪[Test3][Each] executed here`);
});
eachFixtureTest('🧪[Test4][Each] Each Fixture Example', () => {
  console.log(`🧪[Test4][Each] executed here`);
});
});
eachFixtureTest('🧪[Test5][Each] Each Fixture Example', () => {
  console.log(`🧪[Test5][Each] executed here`);
});

//Combined

combinedTest.describe('Worker+Test Scoped Fixture Scenario', () => {
  combinedTest('🧪[Combined][Test1][All][Each] fixture example', async ({ forEachTest, forEachWorker }) => {
    console.log(`〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️🧪[Test1]🧪 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️`);
  });
  combinedTest('🧪[Combined][Test2][All][Each] fixture example', async ({ forEachTest, forEachWorker }) => {
    console.log(`〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️🧪[Test2]🧪 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️`);
  });
  combinedTest('🧪[Combined][Test3][All][Each] fixture example', async ({ forEachTest, forEachWorker }) => {
    console.log(`〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️🧪[Test3]🧪 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️`);
  });
  combinedTest('🧪[Combined][Test4][All][Each] fixture example', async ({ forEachTest, forEachWorker }) => {
    console.log(`〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️🧪[Test4]🧪 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️`);
  });
});

combinedTest('🧪[Combined][Test5][All][Each] fixture example', async ({ forEachTest, forEachWorker }) => {
    console.log(`〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️🧪[Test5]🧪 〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️`);
  });
