/**
 * Direct AWS Cleanup Utilities
 *
 * Cleans up test users directly via AWS SDK, bypassing the API.
 * Uses local AWS credentials (AWS_PROFILE or environment variables).
 *
 * This is the recommended approach for local development since:
 * - No JWT token management needed
 * - Works with existing AWS credentials
 * - Faster (direct SDK calls)
 */

import {
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {
  DynamoDBClient,
  ScanCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';

// Configuration - can be overridden with environment variables
// Get table name: aws cloudformation describe-stacks --stack-name mercurio-api --query "Stacks[0].Outputs[?OutputKey=='UserManagementTableName'].OutputValue" --output text
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const USER_POOL_ID = process.env.USER_POOL_ID || 'us-east-1_73hXFM1QI';
const USER_MANAGEMENT_TABLE = process.env.USER_MANAGEMENT_TABLE_NAME || 'mercurio-api-UserManagementTable-1OZWZA8HXKGPD';

interface CleanupResult {
  success: boolean;
  deleted: {
    cognitoUsers: number;
    dbUsers: number;
    organizations: number;
  };
  errors: string[];
}

/**
 * Clean up test users directly via AWS SDK
 *
 * @param pattern - Email pattern to match (default: 'e2e-test-')
 * @param dryRun - If true, only returns count without deleting
 */
export async function cleanupTestUsersDirect(
  pattern = 'e2e-test-',
  dryRun = false
): Promise<CleanupResult> {
  const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION });
  const dynamodb = new DynamoDBClient({ region: AWS_REGION });

  const result: CleanupResult = {
    success: true,
    deleted: {
      cognitoUsers: 0,
      dbUsers: 0,
      organizations: 0,
    },
    errors: [],
  };

  console.log(`[Cleanup] Starting ${dryRun ? 'dry-run' : 'cleanup'} with pattern: ${pattern}`);

  try {
    // 1. Find and delete users from Cognito
    const cognitoUsers = await findCognitoUsers(cognito, pattern);
    console.log(`[Cleanup] Found ${cognitoUsers.length} Cognito users matching pattern`);

    for (const email of cognitoUsers) {
      if (dryRun) {
        console.log(`[Cleanup] Would delete Cognito user: ${email}`);
        result.deleted.cognitoUsers++;
      } else {
        try {
          await cognito.send(new AdminDeleteUserCommand({
            UserPoolId: USER_POOL_ID,
            Username: email,
          }));
          result.deleted.cognitoUsers++;
          console.log(`[Cleanup] Deleted Cognito user: ${email}`);
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          if (!msg.includes('UserNotFoundException')) {
            result.errors.push(`Failed to delete Cognito user ${email}: ${msg}`);
          }
        }
      }
    }

    // 2. Find and delete users from DynamoDB
    const dbUsers = await findDynamoDBUsers(dynamodb, pattern);
    console.log(`[Cleanup] Found ${dbUsers.length} DynamoDB users matching pattern`);

    const orgsToDelete = new Set<string>();

    for (const user of dbUsers) {
      if (dryRun) {
        console.log(`[Cleanup] Would delete DB user: ${user.email}`);
        result.deleted.dbUsers++;
        if (user.role === 'org_admin') {
          orgsToDelete.add(user.organizationId);
        }
      } else {
        try {
          await dynamodb.send(new DeleteItemCommand({
            TableName: USER_MANAGEMENT_TABLE,
            Key: {
              pk: { S: user.pk },
              sk: { S: user.sk },
            },
          }));
          result.deleted.dbUsers++;
          console.log(`[Cleanup] Deleted DB user: ${user.email}`);

          if (user.role === 'org_admin') {
            orgsToDelete.add(user.organizationId);
          }
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          result.errors.push(`Failed to delete DB user ${user.email}: ${msg}`);
        }
      }
    }

    // 3. Delete orphaned organizations
    for (const orgId of orgsToDelete) {
      if (dryRun) {
        console.log(`[Cleanup] Would delete organization: ${orgId}`);
        result.deleted.organizations++;
      } else {
        try {
          await dynamodb.send(new DeleteItemCommand({
            TableName: USER_MANAGEMENT_TABLE,
            Key: {
              pk: { S: `ORG#${orgId}` },
              sk: { S: 'METADATA' },
            },
          }));
          result.deleted.organizations++;
          console.log(`[Cleanup] Deleted organization: ${orgId}`);
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          result.errors.push(`Failed to delete organization ${orgId}: ${msg}`);
        }
      }
    }

    console.log(`[Cleanup] Complete. Deleted: ${result.deleted.cognitoUsers} Cognito, ${result.deleted.dbUsers} DB, ${result.deleted.organizations} orgs`);

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    result.success = false;
    result.errors.push(msg);
    console.error('[Cleanup] Error:', msg);
  }

  return result;
}

/**
 * Find Cognito users matching email pattern
 */
async function findCognitoUsers(
  cognito: CognitoIdentityProviderClient,
  pattern: string
): Promise<string[]> {
  const users: string[] = [];
  let paginationToken: string | undefined;

  do {
    const response = await cognito.send(new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      Filter: `email ^= "${pattern}"`,
      Limit: 60,
      PaginationToken: paginationToken,
    }));

    for (const user of response.Users || []) {
      const email = user.Attributes?.find(a => a.Name === 'email')?.Value;
      if (email) {
        users.push(email);
      }
    }

    paginationToken = response.PaginationToken;
  } while (paginationToken);

  return users;
}

interface DynamoDBUser {
  pk: string;
  sk: string;
  email: string;
  organizationId: string;
  role: string;
}

/**
 * Find DynamoDB users matching email pattern
 */
async function findDynamoDBUsers(
  dynamodb: DynamoDBClient,
  pattern: string
): Promise<DynamoDBUser[]> {
  const users: DynamoDBUser[] = [];
  let lastEvaluatedKey: Record<string, { S: string }> | undefined;

  do {
    const response = await dynamodb.send(new ScanCommand({
      TableName: USER_MANAGEMENT_TABLE,
      FilterExpression: 'begins_with(pk, :pkPrefix) AND begins_with(email, :emailPattern)',
      ExpressionAttributeValues: {
        ':pkPrefix': { S: 'USER#' },
        ':emailPattern': { S: pattern },
      },
      ExclusiveStartKey: lastEvaluatedKey,
    }));

    for (const item of response.Items || []) {
      users.push({
        pk: item.pk?.S || '',
        sk: item.sk?.S || '',
        email: item.email?.S || '',
        organizationId: item.organizationId?.S || '',
        role: item.role?.S || '',
      });
    }

    lastEvaluatedKey = response.LastEvaluatedKey as Record<string, { S: string }> | undefined;
  } while (lastEvaluatedKey);

  return users;
}

/**
 * Cleanup after tests - uses direct AWS SDK
 */
export async function cleanupAfterTestsDirect(): Promise<void> {
  try {
    await cleanupTestUsersDirect('e2e-test-', false);
  } catch (error) {
    // Don't fail tests due to cleanup errors
    console.warn('[Cleanup] Direct cleanup failed:', error);
  }
}
