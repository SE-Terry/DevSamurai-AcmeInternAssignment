import axios from 'axios'
import { authService } from '@/services/authService'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      authService.removeToken()
      // Redirect to sign-in page
      window.location.href = '/auth/sign-in'
    }
    
    // Extract error message for better error handling
    const message = error.response?.data?.message || error.message || 'An error occurred'
    
    // Create a custom error object for TanStack Query
    const customError = new Error(message)
    customError.name = 'ApiError'
    
    return Promise.reject(customError)
  }
)

export default api
