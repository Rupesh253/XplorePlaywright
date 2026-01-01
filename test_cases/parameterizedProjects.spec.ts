
import { test as projectLevelTest } from '../test_auxiliaries/fixtures/parameterizeFixture.ts';

//Project-level parameterized tests
projectLevelTest(`Project-level parameterized tests`, ({ person }) => {
  console.log(`Test for ${person}`);
});
