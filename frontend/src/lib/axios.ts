import axios from 'axios'
import { authService } from '@/services/authService'

// Normalize base URL to ensure absolute URL with protocol
function normalizeBaseUrl(raw?: string): string {
  const fallback = 'http://localhost:3000'
  if (!raw || typeof raw !== 'string' || raw.trim().length === 0) return fallback

  let url = raw.trim()

  // If it looks like just a host (no protocol), default to https for production hosts
  if (!/^https?:\/\//i.test(url)) {
    // Support values like "example.com", "example.com:3000", or "/api"
    // If it starts with '/', treat it as relative path and use fallback
    if (url.startsWith('/')) return fallback + url

    url = `https://${url}`
  }

  // Remove trailing slashes for consistency
  url = url.replace(/\/$/, '')
  return url
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL),
  timeout: 10000,
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
      const isAuthEndpoint = error.config?.url?.includes('/auth/signin') || error.config?.url?.includes('/auth/signup')
      
      if (!isAuthEndpoint) {
        // Only redirect if it's not an auth endpoint
        authService.removeToken()
        window.location.href = '/auth/sign-in'
      }
    }
    
    // Extract error message
    const message = error.response?.data?.message || error.message || 'An error occurred'
    
    // Create a custom error object
    const customError = new Error(message)
    customError.name = 'ApiError'
    
    return Promise.reject(customError)
  }
)

export default api
