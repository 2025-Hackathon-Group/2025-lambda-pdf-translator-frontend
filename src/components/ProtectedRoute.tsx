import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div> // Or a spinner component
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export function AuthRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div> // Or a spinner component
  }

  return user ? <Navigate to="/" /> : <Outlet />
} 