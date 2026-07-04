import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { useEffect } from 'react'

export function ProtectedRoute() {
  const { isAuthenticated, fetchUser, token } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    if (token && !isAuthenticated) {
      fetchUser()
    }
  }, [token, isAuthenticated, fetchUser])

  if (!isAuthenticated && !token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Outlet />
}
