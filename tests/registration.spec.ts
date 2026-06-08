import { test, expect } from '@playwright/test';
import { generateTestUser } from './utils/test-user';
import { cleanupAfterTestsDirect } from './utils/cleanup-direct';

/**
 * E2E Registration Flow Tests
 *
 * Tests the full user registration journey from mercuriohub.io
 * landing page through to app.mercuriohub.io login page.
 *
 * Flow:
 * 1. Navigate to /signup on mercuriohub.io
 * 2. Fill registration form
 * 3. Submit form
 * 4. Verify success message
 * 5. Verify redirect to app.mercuriohub.io/login
 *
 * Cleanup:
 * - After all tests, uses AWS SDK directly to delete test users
 * - Requires AWS credentials (AWS_PROFILE or environment variables)
 * - Test users are identified by email pattern: e2e-test-*
 */

test.describe('User Registration Flow', () => {
  // Clean up test users after all tests complete
  test.afterAll(async () => {
    await cleanupAfterTestsDirect();
  });

  test('should complete registration and redirect to login', async ({ page }) => {
    const testUser = generateTestUser();

    // Log test user for debugging
    console.log(`[Test] Creating user: ${testUser.email}`);

    // Step 1: Navigate to signup page
    await page.goto('/en/signup');

    // Verify signup page loaded
    await expect(
      page.getByRole('heading', { name: /start free/i })
    ).toBeVisible({ timeout: 10000 });

    // Step 2: Fill registration form
    await page.getByLabel(/organization name/i).fill(testUser.organizationName);
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(testUser.email);

    // Handle password fields (there are two - password and confirm)
    // Using role=textbox with name filter doesn't work for password fields
    // So we use locator with specific label text
    const passwordField = page.locator('input[type="password"]').first();
    const confirmPasswordField = page.locator('input[type="password"]').nth(1);

    await passwordField.fill(testUser.password);
    await confirmPasswordField.fill(testUser.password);

    // Step 3: Submit form
    await page.getByRole('button', { name: /create account/i }).click();

    // Step 4: Verify success state
    // The app shows "Welcome to Mercurio!" on success
    await expect(
      page.getByText(/welcome to mercurio/i)
    ).toBeVisible({ timeout: 20000 });

    await expect(
      page.getByText(/account has been created successfully/i)
    ).toBeVisible();

    console.log(`[Test] User created successfully: ${testUser.email}`);

    // Step 5: Verify redirect to login page
    // The app redirects to app.mercuriohub.io/login after 3 seconds
    // Note: Cross-domain navigation is handled by Playwright
    const appUrl = process.env.E2E_APP_URL || 'https://app.mercuriohub.io';

    await page.waitForURL(new RegExp(`${appUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/login|.*/login`), {
      timeout: 15000,
    });

    // Verify we're on the login page
    // The login page shows "Welcome Back" or "Sign in"
    await expect(
      page.getByText(/welcome back|sign in to access/i)
    ).toBeVisible({ timeout: 10000 });

    console.log(`[Test] Successfully redirected to login page`);
  });

  test('should show validation error for weak password', async ({ page }) => {
    await page.goto('/en/signup');

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: /start free/i })
    ).toBeVisible({ timeout: 10000 });

    // Fill form with weak password
    await page.getByLabel(/organization name/i).fill('Test Org Weak Password');
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill('weak-password-test@example.com');

    const passwordField = page.locator('input[type="password"]').first();
    const confirmPasswordField = page.locator('input[type="password"]').nth(1);

    // Use a weak password that doesn't meet requirements
    await passwordField.fill('weak');
    await confirmPasswordField.fill('weak');

    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();

    // Should show password validation error
    await expect(
      page.getByText(/password must contain/i)
    ).toBeVisible({ timeout: 5000 });
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    await page.goto('/en/signup');

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: /start free/i })
    ).toBeVisible({ timeout: 10000 });

    // Fill form with mismatched passwords
    await page.getByLabel(/organization name/i).fill('Test Org Mismatch');
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill('mismatch-test@example.com');

    const passwordField = page.locator('input[type="password"]').first();
    const confirmPasswordField = page.locator('input[type="password"]').nth(1);

    await passwordField.fill('ValidPass123!');
    await confirmPasswordField.fill('DifferentPass123!');

    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();

    // Should show mismatch error
    await expect(
      page.getByText(/passwords do not match/i)
    ).toBeVisible({ timeout: 5000 });
  });

  test('should navigate back to home page', async ({ page }) => {
    await page.goto('/en/signup');

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: /start free/i })
    ).toBeVisible({ timeout: 10000 });

    // Click back to home button
    await page.getByRole('button', { name: /back to home/i }).click();

    // Should navigate to the English home page
    await page.waitForURL(/\/en\/?$/, { timeout: 5000 });
  });
});
