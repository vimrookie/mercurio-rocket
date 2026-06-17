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

// ---------------------------------------------------------------------------
// Libro de Reclamaciones (Hoja de Reclamación — Ley N° 29571)
// Mirrors `ComplaintRequest` / the POST /complaints contract in mercurio-api
// (src/types/complaint.types.ts, src/handlers/complaints/create.ts).
// ---------------------------------------------------------------------------

export type ConsumerDocumentType = 'DNI' | 'CE' | 'RUC' | 'PASAPORTE';
export type ComplaintItemType = 'producto' | 'servicio';
export type ComplaintKind = 'reclamo' | 'queja';

export interface ComplaintRequest {
  fullName: string;
  documentType: ConsumerDocumentType;
  documentNumber: string;
  email: string;
  phone?: string;
  address?: string;
  isMinor?: boolean;
  itemType: ComplaintItemType;
  itemDescription: string;
  amount?: number;
  kind: ComplaintKind;
  detail: string;
  /** El "pedido" del consumidor. */
  request: string;
}

export interface ComplaintResponse {
  /** Human-facing correlative, e.g. "2026-000123". */
  correlative: string;
  status: string;
}

/**
 * File a Libro de Reclamaciones entry. The backend assigns a correlative
 * number and emails a copy to the consumer and to Mercurio.
 */
export async function submitComplaint(data: ComplaintRequest): Promise<ComplaintResponse> {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
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
      responseData.error || responseData.message || 'No se pudo registrar el reclamo',
      responseData.details
    );
  }

  return responseData.data as ComplaintResponse;
}
