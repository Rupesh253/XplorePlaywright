import {test as postProcessor} from '@playwright/test';

postProcessor('PostProcessor as global teardown',()=>{
    console.log(`====================PostProcessor activities have been completed!====================`);
});