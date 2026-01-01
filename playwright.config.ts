import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';
import { title } from 'node:process';
import type { TestOptions } from './test_auxiliaries/fixtures/parameterizeFixture';

dotenv.config({ quiet: true, path: path.resolve(path.join('./', `test_environments/${process.env.TARGETHOST || 'qa'}.env`)), override: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  expect: {
    timeout: 10 * 1000,
    toHaveScreenshot: { maxDiffPixels: 10, maxDiffPixelRatio: 0.1, threshold: 0.2 },
    toMatchSnapshot: { maxDiffPixels: 10 },
    toMatchAriaSnapshot: { pathTemplate: '' },
    toPass: { intervals: [1, 5, 10, 50], timeout: 10 * 1000 },
  },
  globalTimeout: 60 * 60 * 1000,
  timeout: 120 * 1000,
  testDir: '.',
  fullyParallel: false,
  failOnFlakyTests: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  maxFailures: process.env.CI ? 5 : 0,
  outputDir: './test_output/results',
  preserveOutput: 'always',
  name: 'Playwright Playground',
  metadata: { title: 'E2E and Functional Tests', version: '0.0.1' },
  quiet: !!process.env.CI,
  tag: process.env.CI ? '@CI_TAG' : '@LOCAL_TAG',
  testIgnore: './*ignore*.spec.ts',
  captureGitInfo: { commit: true, diff: true },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI
    ? 'blob'
    : [
        ['html', { outputFolder: './test_output/reports/htmlReports' }],
        ['json', { outputFile: './test_output/reports/jsonReports/output.json' }],
        ['junit', { outputFile: './test_output/reports/jUnitReports/output.xml' }],
        ['blob', { outputFolder: './test_output/reports/blobReports' }],
      ],
  use: {
    video: 'on',
    trace: 'on',
    viewport: null,
    acceptDownloads: true,
    actionTimeout: 5 * 1000,
    colorScheme: 'dark',
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    deviceScaleFactor: undefined,
    headless: true,
    hasTouch: true,
    launchOptions: { args: ['--start-maximized'] },
    locale: 'en-US',
    timezoneId: 'Europe/Paris',
    navigationTimeout: 90 * 1000,
    permissions: [
      'accelerometer',
      'ambient-light-sensor',
      'background-sync',
      'camera',
      'clipboard-read',
      'clipboard-write',
      'geolocation',
      'gyroscope',
      'local-fonts',
      'local-network-access',
      'magnetometer',
      'microphone',
      'midi',
      'notifications',
      'payment-handler',
      'storage-access',
    ],
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-testid',
  },
  /* Configure projects for major browsers */
  projects: [
    { name: 'GLOBALSETUP_PROJECT', testMatch: '**/globalSetup.spec.ts', teardown: 'GLOBALTEARDOWN_PROJECT' },
    {
      name: 'CHROMIUM_PROJECT',
      use: { ...devices[''], isMobile: false },
      dependencies: ['GLOBALSETUP_PROJECT'],
    },
    { name: 'GLOBALTEARDOWN_PROJECT', testMatch: '**/globalTeardown.spec.ts' },
    { name: 'SMOKE_PROJECT', testDir: 'test_cases/smoke', retries: 3 },
    { name: 'SANITY_PROJECT', testDir: 'test_cases/sanity', retries: 2 },
    { name: 'REGRESSION_PROJECT', testDir: 'test_cases/regression', retries: 1 },
    { name: 'E2E_PROJECT', testDir: 'test_cases/e2e', retries: 0 },
    /*Parameterized projects
    {
      name: 'Rupesh',
      use: { person: 'Rupesh' },
    },
    {
      name: 'Somala',
      use: { person: 'Somala' },
    },
    */
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],isMobile:false },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],isMobile:false },
    },
    //Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'],isMobile:true },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'],isMobile:true },
    },
    //Test against branded browsers.
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }, 
    */
  ],

  /* Run your local dev server before starting the tests 
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  }, */
});
