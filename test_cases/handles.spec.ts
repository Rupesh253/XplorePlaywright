//from co-pilot

import { test, expect, JSHandle } from '@playwright/test';

test.describe('🎯 Playwright Handles Examples', () => {

  test.describe('📦 JSHandle - JavaScript Object References', () => {
    test('Basic JSHandle operations', async ({ page }) => {
      await page.goto('data:text/html,<div id="box">Hello World</div>');

      // Get JSHandle to a JavaScript object
      const windowHandle = await page.evaluateHandle(() => window);
      console.log('✅ Got window handle:', windowHandle);

      // Get JSHandle to DOM element
      const elementHandle = await page.evaluateHandle(() => document.querySelector('#box'));
      console.log('✅ Got element handle:', elementHandle);

      // Get JSHandle to a custom object
      const objectHandle = await page.evaluateHandle(() => {
        return { name: 'Rupesh', age: 30, skills: ['Playwright', 'Testing'] };
      });
      console.log('✅ Got object handle:', objectHandle);

      // Extract properties from JSHandle
      const nameProperty = await objectHandle.getProperty('name');
      const nameValue = await nameProperty.jsonValue();
      console.log('👤 Name from handle:', nameValue);

      const skillsProperty = await objectHandle.getProperty('skills');
      const skillsValue = await skillsProperty.jsonValue();
      console.log('🔧 Skills from handle:', skillsValue);

      expect(nameValue).toBe('Rupesh');
      expect(skillsValue).toEqual(['Playwright', 'Testing']);

      // Dispose handles to prevent memory leaks
      await windowHandle.dispose();
      await elementHandle.dispose();
      await objectHandle.dispose();
      await nameProperty.dispose();
      await skillsProperty.dispose();
    });

    test('JSHandle with Array operations', async ({ page }) => {
      await page.goto('data:text/html,<html><body></body></html>');

      // Create array handle
      const arrayHandle = await page.evaluateHandle(() => [1, 2, 3, 'test', { nested: true }]);

      // Get array length
      const lengthProperty = await arrayHandle.getProperty('length');
      const length = await lengthProperty.jsonValue();
      console.log('📏 Array length:', length);

      // Get specific array elements
      const firstElement = await arrayHandle.getProperty('0');
      const firstValue = await firstElement.jsonValue();
      console.log('🥇 First element:', firstValue);

      const lastElement = await arrayHandle.getProperty('4');
      const lastValue = await lastElement.jsonValue();
      console.log('🏁 Last element:', lastValue);

      expect(length).toBe(5);
      expect(firstValue).toBe(1);
      expect(lastValue).toEqual({ nested: true });

      // Cleanup
      await arrayHandle.dispose();
      await lengthProperty.dispose();
      await firstElement.dispose();
      await lastElement.dispose();
    });

    test('JSHandle with Function operations', async ({ page }) => {
      await page.goto('data:text/html,<html><body></body></html>');

      // Get handle to a function
      const functionHandle = await page.evaluateHandle(() => {
        return function calculator(a: number, b: number, operation: string) {
          switch (operation) {
            case 'add': return a + b;
            case 'multiply': return a * b;
            case 'divide': return a / b;
            default: return 0;
          }
        };
      });

      // Use the function handle
      const result1 = await page.evaluate(
        (fn) => fn(10, 5, 'add'),
        functionHandle
      );
      console.log('➕ Addition result:', result1);

      const result2 = await page.evaluate(
        (fn) => fn(10, 5, 'multiply'),
        functionHandle
      );
      console.log('✖️ Multiplication result:', result2);

      expect(result1).toBe(15);
      expect(result2).toBe(50);

      await functionHandle.dispose();
    });
  });

  test.describe('🌐 ElementHandle - DOM Element References', () => {
    test('ElementHandle basic operations', async ({ page }) => {
      await page.setContent(`
        <div id="container">
          <input id="name" type="text" placeholder="Enter name">
          <button id="submit">Submit</button>
          <p id="output">Output will appear here</p>
        </div>
      `);

      // Get ElementHandle with null checks
      const inputHandle = await page.$('#name');
      const buttonHandle = await page.$('#submit');
      const outputHandle = await page.$('#output');

      console.log('✅ Got element handles');

      // Use ElementHandle methods with proper null checks
      if (inputHandle && buttonHandle && outputHandle) {
        await inputHandle.fill('Rupesh Kumar Somala');
        await buttonHandle.click();

        // Get element properties
        const inputValue = await inputHandle.inputValue();
        const buttonText = await buttonHandle.textContent();
        const outputText = await outputHandle.textContent();

        console.log('📝 Input value:', inputValue);
        console.log('🔘 Button text:', buttonText);
        console.log('📄 Output text:', outputText);

        expect(inputValue).toBe('Rupesh Kumar Somala');
        expect(buttonText).toBe('Submit');
      } else {
        throw new Error('Could not find required elements');
      }
    });

    test('ElementHandle with multiple elements', async ({ page }) => {
      await page.setContent(`
        <ul id="fruits">
          <li data-fruit="apple">🍎 Apple</li>
          <li data-fruit="banana">🍌 Banana</li>
          <li data-fruit="orange">🍊 Orange</li>
          <li data-fruit="grape">🍇 Grape</li>
        </ul>
      `);

      // Get multiple element handles
      const fruitHandles = await page.$$('li[data-fruit]');
      console.log(`🍎 Found ${fruitHandles.length} fruit elements`);

      // Process each handle
      for (let i = 0; i < fruitHandles.length; i++) {
        const handle = fruitHandles[i];
        const text = await handle.textContent();
        const fruit = await handle.getAttribute('data-fruit');
        
        console.log(`${i + 1}. ${text} (${fruit})`);
        
        // Click each fruit
        await handle.click();
      }

      expect(fruitHandles.length).toBe(4);
    });

    test('ElementHandle evaluation and properties', async ({ page }) => {
      await page.setContent(`
        <div id="box" class="container" style="width: 200px; height: 100px; background: red;">
          Content Box
        </div>
      `);

      const boxHandle = await page.$('#box');

      if (boxHandle) {
        // Evaluate on element
        const dimensions = await boxHandle.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            className: element.className,
            id: element.id
          };
        });

        console.log('📐 Box dimensions:', dimensions);

        // Get computed styles
        const styles = await boxHandle.evaluate((element) => {
          const computed = window.getComputedStyle(element);
          return {
            backgroundColor: computed.backgroundColor,
            width: computed.width,
            height: computed.height
          };
        });

        console.log('🎨 Computed styles:', styles);

        expect(dimensions.width).toBe(200);
        expect(dimensions.height).toBe(100);
        expect(dimensions.className).toBe('container');
      } else {
        throw new Error('Could not find box element');
      }
    });
  });

  test.describe('🔄 Handle Conversions and Operations', () => {
    test('Converting between handle types', async ({ page }) => {
      await page.setContent(`
        <div id="data-container" data-info='{"user": "Rupesh", "role": "Tester"}'>
          User Information
        </div>
      `);

      // ElementHandle to JSHandle conversion
      const elementHandle = await page.$('#data-container');
      
      if (elementHandle) {
        // Get JSHandle from ElementHandle
        const jsHandle = await elementHandle.evaluateHandle((element) => {
          const dataAttr = element.getAttribute('data-info');
          return {
            tagName: element.tagName,
            textContent: element.textContent,
            dataInfo: dataAttr ? JSON.parse(dataAttr) : null,
            boundingBox: element.getBoundingClientRect()
          };
        });

        // Extract data from JSHandle
        const tagProperty = await jsHandle.getProperty('tagName');
        const tagName = await tagProperty.jsonValue();

        const dataProperty = await jsHandle.getProperty('dataInfo');
        const dataInfo = await dataProperty.jsonValue();

        console.log('🏷️ Tag name:', tagName);
        console.log('📊 Data info:', dataInfo);

        expect(tagName).toBe('DIV');
        expect((dataInfo as any).user).toBe('Rupesh');
        expect((dataInfo as any).role).toBe('Tester');

        // Cleanup
        await jsHandle.dispose();
        await tagProperty.dispose();
        await dataProperty.dispose();
      } else {
        throw new Error('Could not find data container element');
      }
    });

    test('Handle serialization and JSON values', async ({ page }) => {
      await page.goto('data:text/html,<html><body></body></html>');

      // Create complex object handle
      const complexHandle = await page.evaluateHandle(() => {
        return {
          timestamp: new Date().toISOString(),
          browser: {
            name: 'Playwright',
            version: '1.40+',
            features: ['Auto-wait', 'Mobile testing', 'Screenshots']
          },
          performance: {
            loadTime: 1250,
            firstPaint: 890,
            metrics: [100, 200, 300, 400]
          }
        };
      });

      // Convert entire handle to JSON
      const jsonData = await complexHandle.jsonValue();
      console.log('📦 Complete object:', JSON.stringify(jsonData, null, 2));

      // Access nested properties
      const browserHandle = await complexHandle.getProperty('browser');
      const browserData = await browserHandle.jsonValue();
      console.log('🌐 Browser info:', browserData);

      const featuresHandle = await browserHandle.getProperty('features');
      const features = await featuresHandle.jsonValue();
      console.log('⚡ Features:', features);

      expect((browserData as any).name).toBe('Playwright');
      expect((features as any)).toContain('Auto-wait');
      expect((jsonData as any).performance.loadTime).toBe(1250);

      // Cleanup
      await complexHandle.dispose();
      await browserHandle.dispose();
      await featuresHandle.dispose();
    });
  });

  test.describe('🎭 Advanced Handle Patterns', () => {
    test('Handle with page functions and callbacks', async ({ page }) => {
      await page.setContent(`
        <div id="interactive">
          <button id="btn1">Button 1</button>
          <button id="btn2">Button 2</button>
          <button id="btn3">Button 3</button>
          <div id="result">No button clicked</div>
        </div>
      `);

      // Create a callback function handle
      const callbackHandle = await page.evaluateHandle(() => {
        return function(buttonId: string, timestamp: string) {
          const resultDiv = document.getElementById('result');
          if (resultDiv) {
            resultDiv.textContent = `Button ${buttonId} clicked at ${timestamp}`;
          }
          return `Processed: ${buttonId}`;
        };
      });

      // Use the callback with different buttons
      const buttons = await page.$$('#interactive button');
      
      for (let i = 0; i < buttons.length; i++) {
        const buttonHandle = buttons[i];
        const buttonId = await buttonHandle.getAttribute('id');
        
        if (buttonId) {
          // Execute callback through handle
          const result = await page.evaluate(
            ({ callback, id, time }) => callback(id, time),
            {
              callback: callbackHandle,
              id: buttonId,
              time: new Date().toISOString()
            }
          );
          
          console.log(`🔘 ${result}`);
          
          // Simulate button click
          await buttonHandle.click();
          await page.waitForTimeout(500);
        }
      }

      await callbackHandle.dispose();
    });

    test('Handle with error handling and validation', async ({ page }) => {
      await page.goto('data:text/html,<div id="test">Test Content</div>');

      // Create handle with error handling
      const safeHandle = await page.evaluateHandle(() => {
        return {
          safeExecute: function(operation: string) {
            try {
              switch(operation) {
                case 'getTime':
                  return new Date().getTime();
                case 'getUrl':
                  return window.location.href;
                case 'getTitle':
                  return document.title || 'No title';
                case 'error':
                  throw new Error('Intentional error for testing');
                default:
                  return 'Unknown operation';
              }
            } catch (error) {
              return { error: (error as Error).message };
            }
          }
        };
      });

      // Test various operations
      const operations = ['getTime', 'getUrl', 'getTitle', 'error', 'unknown'];
      
      for (const operation of operations) {
        const result = await page.evaluate(
          (handle, op) => handle.safeExecute(op),
          safeHandle,
          operation
        );
        
        console.log(`🔧 Operation '${operation}':`, result);
      }

      // Validate handle still exists
      const handleExists = await page.evaluate(
        handle => typeof handle.safeExecute === 'function', 
        safeHandle
      );
      console.log('✅ Handle validation:', handleExists);
      
      expect(handleExists).toBe(true);

      await safeHandle.dispose();
    });
  });

  test.describe('🧹 Handle Memory Management', () => {
    test('Proper handle disposal and cleanup', async ({ page }) => {
      await page.goto('data:text/html,<div>Memory Management Test</div>');

      const handles: JSHandle[] = [];

      // Create multiple handles
      for (let i = 0; i < 5; i++) {
        const handle = await page.evaluateHandle((index) => {
          return {
            id: index,
            data: new Array(100).fill(`data-${index}`),
            timestamp: Date.now()
          };
        }, i);
        
        handles.push(handle);
        console.log(`📦 Created handle ${i}`);
      }

      // Use handles
      for (let i = 0; i < handles.length; i++) {
        const idProperty = await handles[i].getProperty('id');
        const id = await idProperty.jsonValue();
        console.log(`🔍 Processing handle with ID: ${id}`);
        await idProperty.dispose();
      }

      // Dispose all handles
      for (let i = 0; i < handles.length; i++) {
        await handles[i].dispose();
        console.log(`🗑️ Disposed handle ${i}`);
      }

      console.log('✅ All handles disposed successfully');

      // Verify cleanup (handles should be disposed)
      expect(handles.length).toBe(5);
    });
  });

  test.describe('🚀 Real-world Handle Examples', () => {
    test('Working with complex DOM structures using handles', async ({ page }) => {
      await page.setContent(`
        <div id="app">
          <header>
            <nav>
              <ul id="menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <section id="content">
              <h1>Welcome to Playwright Handles Demo</h1>
              <p>This is a comprehensive example.</p>
            </section>
          </main>
        </div>
      `);

      // Get handle to the entire app structure
      const appHandle = await page.evaluateHandle(() => {
        const app = document.getElementById('app');
        if (!app) return null;

        return {
          structure: {
            tagName: app.tagName,
            children: Array.from(app.children).map(child => ({
              tagName: child.tagName,
              id: child.id,
              className: child.className
            }))
          },
          navigation: {
            menuItems: Array.from(document.querySelectorAll('#menu a')).map(link => ({
              text: link.textContent,
              href: (link as HTMLAnchorElement).href
            }))
          },
          content: {
            title: document.querySelector('h1')?.textContent,
            description: document.querySelector('p')?.textContent
          }
        };
      });

      const appData = await appHandle.jsonValue();
      console.log('🏗️ App structure:', JSON.stringify(appData, null, 2));

      expect((appData as any).structure.tagName).toBe('DIV');
      expect((appData as any).navigation.menuItems).toHaveLength(3);
      expect((appData as any).content.title).toBe('Welcome to Playwright Handles Demo');

      await appHandle.dispose();
    });

    test('Handle-based form validation', async ({ page }) => {
      await page.setContent(`
        <form id="userForm">
          <input type="text" id="username" required>
          <input type="email" id="email" required>
          <input type="password" id="password" required>
          <button type="submit">Submit</button>
        </form>
      `);

      // Create validation handle
      const validatorHandle = await page.evaluateHandle(() => {
        return {
          validateForm: function() {
            const form = document.getElementById('userForm') as HTMLFormElement;
            if (!form) return { valid: false, errors: ['Form not found'] };

            const errors: string[] = [];
            const username = (document.getElementById('username') as HTMLInputElement)?.value;
            const email = (document.getElementById('email') as HTMLInputElement)?.value;
            const password = (document.getElementById('password') as HTMLInputElement)?.value;

            if (!username || username.length < 3) {
              errors.push('Username must be at least 3 characters');
            }

            if (!email || !email.includes('@')) {
              errors.push('Valid email is required');
            }

            if (!password || password.length < 6) {
              errors.push('Password must be at least 6 characters');
            }

            return {
              valid: errors.length === 0,
              errors: errors,
              data: { username, email, password: '***' }
            };
          }
        };
      });

      // Test validation with different inputs
      const testCases = [
        { username: 'ru', email: 'invalid', password: '123' },
        { username: 'rupesh', email: 'rupesh@test.com', password: 'securepass' }
      ];

      for (const testCase of testCases) {
        await page.fill('#username', testCase.username);
        await page.fill('#email', testCase.email);
        await page.fill('#password', testCase.password);

        const validation = await page.evaluate(
          validator => validator.validateForm(),
          validatorHandle
        );

        console.log(`🔍 Validation result for ${testCase.username}:`, validation);

        if (testCase.username === 'rupesh') {
          expect((validation as any).valid).toBe(true);
        } else {
          expect((validation as any).valid).toBe(false);
        }
      }

      await validatorHandle.dispose();
    });
  });

});