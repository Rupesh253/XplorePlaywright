//from co-pilot
import { test, expect, devices } from '@playwright/test';

test.describe('PT Approaches', () => {

  test.describe('🎯 Network Performance Testing', () => {
    test('Slow 3G performance', async ({ page }) => {
      // Simulate slow network conditions
      await page.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add delay
        await route.continue();
      });

      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      const loadTime = Date.now() - startTime;

      console.log(`Page loaded in ${loadTime}ms on slow network`);
      expect(loadTime).toBeLessThan(15000); // Should load under 15s
    });

    test('Fast network performance', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      const loadTime = Date.now() - startTime;

      console.log(`Page loaded in ${loadTime}ms on fast network`);
      expect(loadTime).toBeLessThan(5000); // Should load under 5s
    });
  });

  test.describe('🖥️ Screen Density Impact Testing', () => {
    test('Low density device performance', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['Nokia Lumia 520'], // 1.5x scale
      });
      const page = await context.newPage();

      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      
      const totalTime = Date.now() - startTime;
      console.log(`Low density (1.5x scale): ${totalTime}ms`);
      
      await context.close();
    });

    test('High density device performance', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['Galaxy S9+'], // 4.5x scale
      });
      const page = await context.newPage();

      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      
      const totalTime = Date.now() - startTime;
      console.log(`High density (4.5x scale): ${totalTime}ms`);
      
      await context.close();
    });
  });

  test.describe('⚡ CPU Performance Testing', () => {
    test('JavaScript performance comparison', async ({ page }) => {
      await page.goto('https://playwright.dev');
      
      const performanceResult = await page.evaluate(() => {
        const startTime = performance.now();
        
        // Simulate heavy computation
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
          result += Math.random();
        }
        
        const endTime = performance.now();
        return {
          computationTime: endTime - startTime,
          result: result
        };
      });
      
      console.log(`JavaScript computation took: ${performanceResult.computationTime}ms`);
      expect(performanceResult.computationTime).toBeLessThan(1000);
    });
  });

  test.describe('📏 Viewport Size Performance', () => {
    test('Small viewport performance', async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 320, height: 568 } // iPhone SE
      });
      const page = await context.newPage();

      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      console.log(`Small viewport (320x568): ${loadTime}ms`);
      await context.close();
    });

    test('Large viewport performance', async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 } // Desktop
      });
      const page = await context.newPage();

      const startTime = Date.now();
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      console.log(`Large viewport (1920x1080): ${loadTime}ms`);
      await context.close();
    });
  });

  test.describe('🔧 Memory Performance Testing', () => {
    test('Memory usage comparison', async ({ browser }) => {
      const deviceConfigs = [
        { name: 'Low-end mobile', config: { ...devices['Nokia Lumia 520'] } },
        { name: 'Mid-range mobile', config: { ...devices['iPhone 8'] } },
        { name: 'High-end mobile', config: { ...devices['Galaxy S9+'] } }
      ];

      for (const deviceConfig of deviceConfigs) {
        const context = await browser.newContext(deviceConfig.config);
        const page = await context.newPage();

        await page.goto('https://playwright.dev');
        await page.waitForLoadState('networkidle');

        // Get memory usage after page load
        const memoryInfo = await page.evaluate(() => {
          const memory = (performance as any).memory;
          return memory ? {
            usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024)
          } : { usedJSHeapSize: 0, totalJSHeapSize: 0 };
        });

        console.log(`${deviceConfig.name}: Memory used = ${memoryInfo.usedJSHeapSize}MB`);

        await context.close();
      }
    });
  });

  test.describe('🎨 Rendering Performance', () => {
    test('Animation performance on different densities', async ({ browser }) => {
      const densityTests = [
        { name: 'Low Density', device: 'Nokia Lumia 520', scale: 1.5 },
        { name: 'Standard Density', device: 'iPhone 8', scale: 2 },
        { name: 'High Density', device: 'Galaxy S9+', scale: 4.5 }
      ];

      for (const densityTest of densityTests) {
        const context = await browser.newContext({
          ...devices[densityTest.device as keyof typeof devices]
        });
        const page = await context.newPage();

        const animationHTML = `
          <div style="
            width: 100px; 
            height: 100px; 
            background: red; 
            animation: spin 1s linear infinite;
          ">Test</div>
          <style>
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        `;
        
        await page.goto(`data:text/html,${animationHTML}`);

        // Measure basic rendering performance
        const renderTime = await page.evaluate(async () => {
          const startTime = performance.now();
          
          // Wait for a few animation frames
          await new Promise(resolve => {
            let frames = 0;
            function countFrame() {
              frames++;
              if (frames < 60) { // 1 second at 60fps
                requestAnimationFrame(countFrame);
              } else {
                resolve(true);
              }
            }
            requestAnimationFrame(countFrame);
          });
          
          return performance.now() - startTime;
        });

        console.log(`${densityTest.name} (${densityTest.scale}x): Animation render time = ${Math.round(renderTime)}ms`);
        await context.close();
      }
    });
  });

  test.describe('📊 Performance Metrics', () => {
    test('Page load performance metrics', async ({ page }) => {
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');

      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        return {
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          firstPaint: Math.round((performance.getEntriesByName('first-paint')[0]?.startTime || 0)),
          firstContentfulPaint: Math.round((performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0))
        };
      });

      console.log('Performance Metrics:', performanceMetrics);
      
      // Assert reasonable performance thresholds
      expect(performanceMetrics.domContentLoaded).toBeLessThan(3000);
      expect(performanceMetrics.loadComplete).toBeLessThan(5000);
    });
  });

});
