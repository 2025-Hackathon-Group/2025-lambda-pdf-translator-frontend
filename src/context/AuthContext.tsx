import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

import type { AuthResponse, User } from "@/types/auth"
import api from "@/lib/api"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (data: AuthResponse) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = Cookies.get("token")
    const storedUser = Cookies.get("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
    }
    setIsLoading(false)
  }, [])

  const login = (data: AuthResponse) => {
    setToken(data.token)
    setUser(data.user)
    Cookies.set("token", data.token, { expires: 7 })
    Cookies.set("user", JSON.stringify(data.user), { expires: 7 })
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    Cookies.remove("token")
    Cookies.remove("user")
    delete api.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}