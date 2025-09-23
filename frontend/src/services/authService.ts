const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.message || 'Sign up failed')
    }

    return response.json()
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.message || 'Sign in failed')
    }

    return response.json()
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
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        this.removeToken() // Clear invalid token
        throw new Error('Authentication token is invalid')
      }
      throw new Error('Failed to fetch user profile')
    }

    return response.json()
  }
}

export const authService = new AuthService()
