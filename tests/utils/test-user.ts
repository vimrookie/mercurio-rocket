/**
 * Test User Generator for E2E Tests
 *
 * Generates unique test users with identifiable email patterns
 * for easy cleanup after test runs.
 */

export interface TestUser {
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Generate a unique test user with identifiable email pattern
 * Pattern: e2e-test-{timestamp}-{random}@mercuriohub.io
 *
 * This pattern allows:
 * - Easy identification of test users
 * - Automated cleanup via admin API
 * - No email conflicts between test runs
 */
export function generateTestUser(): TestUser {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return {
    organizationName: `E2E Test Org ${timestamp}`,
    firstName: 'E2E',
    lastName: 'TestUser',
    email: `e2e-test-${timestamp}-${randomSuffix}@mercuriohub.io`,
    // Password meets all Cognito requirements:
    // - 8+ characters
    // - Uppercase letter
    // - Lowercase letter
    // - Number
    // - Special character
    password: 'E2eTest123!@#',
  };
}

/**
 * Generate a test user with a specific email suffix
 * Useful for testing specific scenarios
 */
export function generateTestUserWithSuffix(suffix: string): TestUser {
  const timestamp = Date.now();

  return {
    organizationName: `E2E Test Org ${suffix}`,
    firstName: 'E2E',
    lastName: suffix,
    email: `e2e-test-${timestamp}-${suffix}@mercuriohub.io`,
    password: 'E2eTest123!@#',
  };
}
