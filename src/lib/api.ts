// Use environment variable for API base URL
// Defaults to production if not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.mercuriohub.io';

// Log the API URL being used (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('[API] Using API base URL:', API_BASE_URL);
}

export interface SignupRequest {
  organizationName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponse {
  message: string;
  organization: {
    id: string;
    name: string;
    plan: string;
  };
  nextSteps: string;
}

export interface SignupErrorResponse {
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    public details?: Array<{ field: string; message: string }>
  ) {
    super(error);
    this.name = 'ApiError';
  }
}

/**
 * Sign up a new organization with an owner account
 */
export async function signupOrganization(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      responseData.message || 'Failed to create account',
      responseData.details
    );
  }

  return responseData;
}
