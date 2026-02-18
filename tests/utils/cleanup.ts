/**
 * Test Cleanup Utilities
 *
 * Provides functions to clean up test users and organizations
 * created during E2E test runs via the admin API.
 */

interface CleanupResult {
  success: boolean;
  deleted?: {
    cognitoUsers: number;
    dbUsers: number;
    organizations: number;
  };
  errors?: string[];
}

/**
 * Clean up all test users matching the e2e-test- pattern
 *
 * Requires:
 * - E2E_API_URL environment variable (defaults to https://api.mercuriohub.io)
 * - E2E_ADMIN_TOKEN environment variable (super_admin JWT token)
 *
 * @param dryRun - If true, only returns count without deleting
 * @returns Cleanup result with counts of deleted resources
 */
export async function cleanupTestUsers(dryRun = false): Promise<CleanupResult> {
  const apiUrl = process.env.E2E_API_URL || 'https://api.mercuriohub.io';
  const adminToken = process.env.E2E_ADMIN_TOKEN;

  if (!adminToken) {
    console.warn('[Cleanup] E2E_ADMIN_TOKEN not set - skipping cleanup');
    return {
      success: false,
      errors: ['E2E_ADMIN_TOKEN environment variable not set'],
    };
  }

  const pattern = 'e2e-test-';
  const url = `${apiUrl}/admin/test-users?pattern=${encodeURIComponent(pattern)}&dryRun=${dryRun}`;

  try {
    console.log(`[Cleanup] Calling ${dryRun ? 'dry-run' : 'cleanup'} at ${apiUrl}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Cleanup] API error: ${response.status} - ${errorText.substring(0, 200)}`);
      return {
        success: false,
        errors: [`API returned ${response.status}: ${errorText.substring(0, 100)}`],
      };
    }

    // Check if response is JSON (not HTML error page)
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error(`[Cleanup] Expected JSON but got: ${contentType}`);
      console.error(`[Cleanup] Response: ${text.substring(0, 200)}`);
      return {
        success: false,
        errors: ['API returned non-JSON response - endpoint may not be deployed yet'],
      };
    }

    const result = await response.json();
    console.log('[Cleanup] Result:', JSON.stringify(result, null, 2));

    return {
      success: true,
      deleted: result.deleted || result.wouldDelete,
      errors: result.errors,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Cleanup] Error:', message);
    return {
      success: false,
      errors: [message],
    };
  }
}

/**
 * Clean up test users in afterAll hook
 * Silently handles errors to not fail the test suite
 */
export async function cleanupAfterTests(): Promise<void> {
  try {
    const result = await cleanupTestUsers(false);
    if (result.success && result.deleted) {
      console.log(
        `[Cleanup] Deleted ${result.deleted.cognitoUsers} Cognito users, ` +
          `${result.deleted.dbUsers} DB users, ${result.deleted.organizations} orgs`
      );
    }
  } catch (error) {
    // Don't fail tests due to cleanup errors
    console.warn('[Cleanup] Cleanup failed:', error);
  }
}
