import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E registration tests
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // 60s timeout for real Cognito calls
  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  // Registration tests should run sequentially to avoid conflicts
  fullyParallel: false,

  // Fail build on CI if accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Single worker for auth tests to avoid rate limiting
  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    // Base URL for mercurio-rocket (landing page on port 3001)
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3001',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot only on failure
    screenshot: 'only-on-failure',

    // Video on first retry
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Run local dev server before tests (skip in CI - use deployed URLs)
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
