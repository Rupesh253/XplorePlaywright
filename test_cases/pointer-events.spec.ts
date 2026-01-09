//from co-pilot::not-mine
import { expect, test } from '@playwright/test';

test.describe('🎯 Pointer Events & Actionability Checks', () => {

  test('🔍 Understanding Pointer Event Reception', async ({ page }) => {
    console.log('🚀 Testing how Playwright checks pointer event reception...\n');

    // Create a test page with overlapping elements
    await page.setContent(`
      <html>
        <head>
          <style>
            .container { position: relative; width: 400px; height: 300px; margin: 50px; }
            
            .target-button {
              position: absolute;
              top: 50px;
              left: 50px;
              width: 150px;
              height: 50px;
              background: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
              z-index: 1;
            }
            
            .overlay {
              position: absolute;
              top: 25px;
              left: 25px;
              width: 200px;
              height: 100px;
              background: rgba(255, 0, 0, 0.7);
              z-index: 10;
              display: none;
            }
            
            .overlay.visible { display: block; }
            
            .transparent-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 400px;
              height: 300px;
              background: transparent;
              z-index: 5;
              pointer-events: none;
            }
            
            .blocking-overlay {
              position: absolute;
              top: 40px;
              left: 40px;
              width: 170px;
              height: 70px;
              background: rgba(0, 0, 255, 0.5);
              z-index: 15;
              display: none;
            }
            
            .blocking-overlay.visible { display: block; }
            
            #log { margin-top: 20px; padding: 10px; border: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h1>Pointer Event Reception Tests</h1>
          
          <div class="container">
            <button class="target-button" id="target" onclick="logClick('Target Button')">
              Click Me!
            </button>
            <div class="overlay" id="overlay" onclick="logClick('Red Overlay')">Red Overlay</div>
            <div class="transparent-overlay" id="transparent" onclick="logClick('Transparent Overlay')">Transparent</div>
            <div class="blocking-overlay" id="blocking" onclick="logClick('Blocking Overlay')">Blocking</div>
          </div>
          
          <button onclick="toggleOverlay('overlay')">Toggle Red Overlay</button>
          <button onclick="toggleOverlay('blocking')">Toggle Blocking Overlay</button>
          <button onclick="clearLog()">Clear Log</button>
          
          <div id="log"></div>
          
          <script>
            function logClick(element) {
              const log = document.getElementById('log');
              const timestamp = new Date().toLocaleTimeString();
              log.innerHTML += \`<div>[\${timestamp}] Clicked: \${element}</div>\`;
            }
            
            function toggleOverlay(id) {
              const overlay = document.getElementById(id);
              overlay.classList.toggle('visible');
            }
            
            function clearLog() {
              document.getElementById('log').innerHTML = '';
            }
            
            // Add event listeners to track pointer events
            document.addEventListener('click', (e) => {
              console.log('Click event at:', e.clientX, e.clientY);
              console.log('Target element:', e.target.tagName, e.target.className || e.target.id);
            });
            
            document.addEventListener('pointerover', (e) => {
              console.log('Pointer over:', e.target.tagName, e.target.className || e.target.id);
            });
          </script>
        </body>
      </html>
    `);

    // 🎯 Test 1: Normal clickable element (should work)
    console.log('📝 Test 1: Normal clickable element...');
    await page.click('#target');
    const logContent1 = await page.textContent('#log') || '';
    console.log(`✅ Log shows: ${logContent1.includes('Target Button') ? 'SUCCESS' : 'FAILED'}`);
    await page.click('button:has-text("Clear Log")');

    // 🎯 Test 2: Element behind transparent overlay (should work - pointer-events: none)
    console.log('\n📝 Test 2: Element behind transparent overlay...');
    await page.click('#target'); // Should still work because transparent overlay has pointer-events: none
    const logContent2 = await page.textContent('#log') || '';
    console.log(`✅ Log shows: ${logContent2.includes('Target Button') ? 'SUCCESS - passed through transparent overlay' : 'FAILED'}`);
    await page.click('button:has-text("Clear Log")');

    // 🎯 Test 3: Element behind visible overlay (should fail actionability check)
    console.log('\n📝 Test 3: Element behind visible overlay...');
    await page.click('button:has-text("Toggle Red Overlay")'); // Show red overlay
    
    try {
      await page.click('#target', { timeout: 2000 }); // This should fail
      console.log('❌ UNEXPECTED: Click succeeded when it should have been blocked');
    } catch (error) {
      console.log('✅ EXPECTED: Click failed due to overlay blocking pointer events');
      console.log(`   Error: ${(error as Error).message.split('\n')[0]}`);
    }
    
    // 🎯 Test 4: Force click (bypass actionability checks)
    console.log('\n📝 Test 4: Force click to bypass checks...');
    await page.click('#target', { force: true }); // Force the click
    const logContent4 = await page.textContent('#log') || '';
    console.log(`✅ Force click result: ${logContent4.includes('Target Button') ? 'SUCCESS - bypassed overlay' : 'FAILED'}`);
    await page.click('button:has-text("Clear Log")');
    await page.click('button:has-text("Toggle Red Overlay")'); // Hide red overlay

    // 🎯 Test 5: Click on the actual hit target (overlay)
    console.log('\n📝 Test 5: Click the actual hit target (overlay)...');
    await page.click('button:has-text("Toggle Blocking Overlay")'); // Show blocking overlay
    await page.click('#target'); // This will actually click the blocking overlay
    const logContent5 = await page.textContent('#log') || '';
    console.log(`✅ Actual target clicked: ${logContent5.includes('Blocking Overlay') ? 'SUCCESS - clicked overlay instead' : 'FAILED'}`);
  });

  test('🔬 Actionability Check Details', async ({ page }) => {
    console.log('🔍 Demonstrating Playwright\'s actionability checks...\n');

    await page.setContent(`
      <html>
        <head>
          <style>
            .test-area { margin: 20px; padding: 20px; border: 1px solid #ccc; }
            .hidden { display: none; }
            .invisible { visibility: hidden; }
            .zero-opacity { opacity: 0; }
            .disabled { pointer-events: none; }
            .covered {
              position: relative;
              background: lightblue;
              width: 200px;
              height: 50px;
            }
            .cover {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(255, 0, 0, 0.7);
              z-index: 10;
            }
          </style>
        </head>
        <body>
          <div class="test-area">
            <h3>Visibility Tests</h3>
            <button id="visible">Visible Button</button>
            <button id="hidden" class="hidden">Hidden Button</button>
            <button id="invisible" class="invisible">Invisible Button</button>
            <button id="zero-opacity" class="zero-opacity">Zero Opacity Button</button>
          </div>
          
          <div class="test-area">
            <h3>Pointer Events Tests</h3>
            <button id="normal">Normal Button</button>
            <button id="disabled-pe" class="disabled">Disabled Pointer Events</button>
          </div>
          
          <div class="test-area">
            <h3>Coverage Tests</h3>
            <div class="covered">
              <button id="covered-btn">Covered Button</button>
              <div class="cover"></div>
            </div>
          </div>
          
          <div id="results"></div>
          
          <script>
            function logResult(test, result) {
              const results = document.getElementById('results');
              results.innerHTML += \`<div>\${test}: \${result}</div>\`;
            }
            
            document.querySelectorAll('button').forEach(btn => {
              btn.onclick = () => logResult('Clicked', btn.id);
            });
          </script>
        </body>
      </html>
    `);

    const tests = [
      { id: '#visible', name: 'Visible button', shouldWork: true },
      { id: '#hidden', name: 'Hidden button (display: none)', shouldWork: false },
      { id: '#invisible', name: 'Invisible button (visibility: hidden)', shouldWork: false },
      { id: '#zero-opacity', name: 'Zero opacity button', shouldWork: false },
      { id: '#normal', name: 'Normal button', shouldWork: true },
      { id: '#disabled-pe', name: 'Disabled pointer events', shouldWork: false },
      { id: '#covered-btn', name: 'Covered button', shouldWork: false }
    ];

    for (const test of tests) {
      console.log(`\n🧪 Testing: ${test.name}`);
      
      try {
        await page.click(test.id, { timeout: 2000 });
        console.log(`   ✅ Click succeeded - ${test.shouldWork ? 'EXPECTED' : 'UNEXPECTED'}`);
      } catch (error) {
        console.log(`   ❌ Click failed - ${test.shouldWork ? 'UNEXPECTED' : 'EXPECTED'}`);
        if (error.message.includes('not visible')) {
          console.log(`   📝 Reason: Element not visible`);
        } else if (error.message.includes('pointer-events')) {
          console.log(`   📝 Reason: Pointer events disabled`);
        } else if (error.message.includes('intercept')) {
          console.log(`   📝 Reason: Another element would receive the click`);
        }
      }
    }

    // Show final results
    const results = await page.textContent('#results') || '';
    console.log(`\n📊 Total successful clicks: ${(results.match(/Clicked:/g) || []).length}`);
  });

  test('⚙️ Custom Actionability Checks', async ({ page }) => {
    console.log('🛠️ Creating custom actionability check examples...\n');

    await page.setContent(`
      <html>
        <head>
          <style>
            .custom-button {
              background: #2196F3;
              color: white;
              border: none;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
            }
            .loading { opacity: 0.5; pointer-events: none; }
            .loading::after { content: ' (Loading...)'; }
          </style>
        </head>
        <body>
          <button id="normal-btn" class="custom-button">Normal Button</button>
          <button id="loading-btn" class="custom-button loading">Loading Button</button>
          <button id="async-btn" class="custom-button">Async Button</button>
          
          <script>
            let isProcessing = false;
            
            document.getElementById('async-btn').onclick = async () => {
              if (isProcessing) return;
              isProcessing = true;
              
              // Simulate async processing
              const btn = document.getElementById('async-btn');
              btn.textContent = 'Processing...';
              btn.style.opacity = '0.5';
              btn.style.pointerEvents = 'none';
              
              setTimeout(() => {
                btn.textContent = 'Async Button';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                isProcessing = false;
              }, 2000);
            };
          </script>
        </body>
      </html>
    `);

    // Custom actionability check function
    const isButtonReady = async (selector: string) => {
      return await page.locator(selector).evaluate((el) => {
        const button = el as HTMLButtonElement;
        const computedStyle = window.getComputedStyle(button);
        
        // Check if element is visible
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
          return false;
        }
        
        // Check if pointer events are enabled
        if (computedStyle.pointerEvents === 'none') {
          return false;
        }
        
        // Check opacity
        if (parseFloat(computedStyle.opacity) < 0.5) {
          return false;
        }
        
        // Custom business logic - check if button is not in loading state
        if (button.classList.contains('loading')) {
          return false;
        }
        
        return true;
      });
    };

    // Test custom actionability checks
    const buttons = ['#normal-btn', '#loading-btn', '#async-btn'];
    
    for (const btnSelector of buttons) {
      console.log(`\n🔍 Checking actionability of ${btnSelector}:`);
      
      const isReady = await isButtonReady(btnSelector);
      console.log(`   Custom check result: ${isReady ? 'READY' : 'NOT READY'}`);
      
      if (isReady) {
        try {
          await page.click(btnSelector, { timeout: 1000 });
          console.log(`   ✅ Click succeeded`);
        } catch (error) {
          console.log(`   ❌ Click failed: ${error.message.split('\n')[0]}`);
        }
      } else {
        console.log(`   ⏭️ Skipped click due to custom check`);
      }
    }

    // Wait for async button to become ready and test again
    console.log(`\n⏳ Waiting for async button to become ready...`);
    await page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.pointerEvents !== 'none' && parseFloat(style.opacity) >= 1;
      },
      '#async-btn',
      { timeout: 5000 }
    );
    
    const finalCheck = await isButtonReady('#async-btn');
    console.log(`   ✅ Async button is now ready: ${finalCheck}`);
  });

  test('🎯 Hit Testing Examples', async ({ page }) => {
    console.log('🎯 Demonstrating hit testing and element detection...\n');

    await page.setContent(`
      <html>
        <head>
          <style>
            .container { position: relative; width: 300px; height: 200px; margin: 50px; border: 2px solid #000; }
            .target { 
              position: absolute; 
              top: 50px; 
              left: 50px; 
              width: 100px; 
              height: 50px; 
              background: green;
              z-index: 1;
            }
            .overlay1 { 
              position: absolute; 
              top: 25px; 
              left: 25px; 
              width: 150px; 
              height: 100px; 
              background: rgba(255, 0, 0, 0.5);
              z-index: 2;
            }
            .overlay2 { 
              position: absolute; 
              top: 40px; 
              left: 40px; 
              width: 120px; 
              height: 80px; 
              background: rgba(0, 0, 255, 0.5);
              z-index: 3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="target" onclick="console.log('Target clicked!')">Target</div>
            <div class="overlay1" onclick="console.log('Overlay1 clicked!')">Overlay 1</div>
            <div class="overlay2" onclick="console.log('Overlay2 clicked!')">Overlay 2</div>
          </div>
          
          <div id="hit-test-results"></div>
          
          <script>
            function performHitTest(x, y) {
              const element = document.elementFromPoint(x, y);
              const results = document.getElementById('hit-test-results');
              results.innerHTML += \`<div>Hit test at (\${x}, \${y}): \${element?.className || element?.tagName}</div>\`;
              return element;
            }
            
            window.performHitTest = performHitTest;
          </script>
        </body>
      </html>
    `);

    // Get the container bounding box to calculate click coordinates
    const containerBox = await page.locator('.container').boundingBox();
    if (!containerBox) throw new Error('Container not found');

    // Calculate click coordinates (container offset + element position)
    const clickX = containerBox.x + 100; // 50px element position + 50px into element
    const clickY = containerBox.y + 75;  // 50px element position + 25px into element

    console.log(`📍 Container at: (${containerBox.x}, ${containerBox.y})`);
    console.log(`🎯 Target click coordinates: (${clickX}, ${clickY})`);

    // Perform hit test to see what element would receive the click
    const hitTestResult = await page.evaluate(
      ([x, y]) => {
        const element = document.elementFromPoint(x, y);
        return {
          tagName: element?.tagName,
          className: element?.className,
          textContent: element?.textContent?.trim()
        };
      },
      [clickX, clickY]
    );

    console.log(`\n🔍 Hit test result at (${clickX}, ${clickY}):`);
    console.log(`   Element: ${hitTestResult.tagName}`);
    console.log(`   Class: ${hitTestResult.className}`);
    console.log(`   Content: ${hitTestResult.textContent}`);

    // Try to click the target element
    console.log(`\n🖱️ Attempting to click target element...`);
    try {
      await page.click('.target', { timeout: 2000 });
      console.log(`   ❌ Click succeeded - but hit test shows it should hit ${hitTestResult.className}`);
    } catch (error) {
      console.log(`   ✅ Click failed as expected - ${hitTestResult.className} would intercept the click`);
    }

    // Click at the exact coordinates to confirm hit testing
    console.log(`\n🖱️ Clicking at exact coordinates (${clickX}, ${clickY})...`);
    await page.mouse.click(clickX, clickY);

    // Show hit test results
    const results = await page.textContent('#hit-test-results');
    console.log(`\n📊 Hit test results: ${results}`);

    // Demonstrate force clicking
    console.log(`\n💪 Force clicking the target element...`);
    await page.click('.target', { force: true });
    console.log(`   ✅ Force click succeeded - bypassed actionability checks`);
  });

});
