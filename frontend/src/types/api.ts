// API Response types for better type safety with axios

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  error: string
  statusCode: number
}
