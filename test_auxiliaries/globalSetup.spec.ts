import {test as preProcessor} from '@playwright/test';

preProcessor('PreProcessor as global setup',()=>{
    console.log(`====================Preprocessor activities have completed!====================`);
});