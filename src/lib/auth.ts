import api from "./api"
import { AuthResponse } from "@/types/auth"

export const loginUser = async (credentials: any) => {
  const { data } = await api.post<AuthResponse>("/login", credentials)
  return data
}

export const registerUser = async (details: any) => {
  const { data } = await api.post<AuthResponse>("/register", details)
  return data
} 