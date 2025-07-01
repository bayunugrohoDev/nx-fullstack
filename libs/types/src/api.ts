export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors?: T | null; // Optional array of errors, typically for validation errors
  }
  