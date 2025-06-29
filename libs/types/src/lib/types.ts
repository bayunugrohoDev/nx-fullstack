export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: any[] | null; // Optional array of errors, typically for validation errors
}
