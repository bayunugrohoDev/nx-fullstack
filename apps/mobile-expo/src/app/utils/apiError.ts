import { ApiResponse } from '@glibs/types';

export class ApiError extends Error {
  public success: boolean;
  public errors?: any;

  constructor(apiResponse: ApiResponse<any>) {
    super(apiResponse.message);
    this.name = 'ApiError';
    this.success = apiResponse.success;
    this.errors = apiResponse.errors;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
