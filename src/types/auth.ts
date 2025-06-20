export interface Organisation {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  email: string
  organisation: Organisation
}

export interface AuthResponse {
  token: string
  user: User
} 