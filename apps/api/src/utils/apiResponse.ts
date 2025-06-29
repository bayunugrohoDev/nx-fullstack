// src/utils/apiResponse.ts
import { ApiResponse } from '@glibs/types';
import { Response } from 'express';
import { ZodError } from 'zod';

/**
 * Interface for a standardized API response.
 */
// interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T | null;
//   errors?: any[] | null; // Optional array of errors, typically for validation errors
// }

/**
 * Sends a standardized API response.
 *
 * @param res The Express Response object.
 * @param statusCode The HTTP status code (e.g., 200, 201, 400, 401, 403, 404, 409, 500).
 * @param success Boolean indicating if the operation was successful.
 * @param message A human-readable message describing the response.
 * @param data Optional data payload to send with the response.
 * @param errors Optional array of error details (e.g., Zod validation errors).
 */
export function sendApiResponse<T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null,
  errors: any[] | null = null
): Response {
  const response: ApiResponse<T> = {
    success,
    message,
    data,
  };

  if (errors !== null && errors.length > 0) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
}

/**
 * Helper function to handle common internal server errors.
 *
 * @param res The Express Response object.
 * @param error The caught error object.
 * @param message Optional custom message for internal server error.
 */
export function handleServerError(res: Response, error: unknown, customMessage?: string): Response {
  if (error instanceof ZodError) {
    return sendApiResponse(res, 400, false, 'Validation error', null, error.errors);
  }
  console.error('An unexpected server error occurred:', error);
  return sendApiResponse(res, 500, false, customMessage || 'Internal server error', null);
}