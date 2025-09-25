import api from '@/lib/axios'

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: number
    name: string
    email: string
    createdat: string
    updatedat: string
  }
  access_token: string
}

export interface ApiError {
  message: string
  error: string
  statusCode: number
}

class AuthService {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/signup', data)
      return response.data
    } catch (error: any) {
      // Preserve the original error structure for better error handling
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error(error?.message || 'Sign up failed. Please try again.')
    }
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/signin', data)
      return response.data
    } catch (error: any) {
      // Preserve the original error structure for better error handling
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error(error?.message || 'Sign in failed. Please try again.')
    }
  }

  // Token management
  setToken(token: string): void {
    localStorage.setItem('access_token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  removeToken(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  }

  // User management
  setUser(user: AuthResponse['user']): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Fetch user profile using JWT token
  async getProfile(): Promise<{ user: AuthResponse['user'] }> {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch user profile'
      throw new Error(message)
    }
  }
}

export const authService = new AuthService()
