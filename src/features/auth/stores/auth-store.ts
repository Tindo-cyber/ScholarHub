import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthResponse, User, UserRole } from '@/types'
import { authApi } from '@/features/auth/api/auth-api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    university?: string
    program?: string
  }) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
  hasRole: (...roles: UserRole[]) => boolean
}

function setTokens(auth: AuthResponse) {
  localStorage.setItem('scholarhub_token', auth.accessToken)
  localStorage.setItem('scholarhub_refresh', auth.refreshToken)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          if (import.meta.env.VITE_USE_MOCK !== 'false') {
            if (email === 'alex.morgan@university.edu' && password === 'ScholarHub2026!') {
              const mockAuth: AuthResponse = {
                accessToken: 'mock-token',
                refreshToken: 'mock-refresh',
                userId: 'a0000000-0000-0000-0000-000000000001',
                email,
                fullName: 'Alex Morgan',
                role: 'STUDENT',
              }
              setTokens(mockAuth)
              set({ token: mockAuth.accessToken, isAuthenticated: true, user: {
                id: mockAuth.userId, email, firstName: 'Alex', lastName: 'Morgan',
                fullName: 'Alex Morgan', role: 'STUDENT',
                university: 'Stanford University', program: 'MSc Computer Science',
              }})
              return
            }
            throw new Error('Invalid credentials')
          }
          const auth = await authApi.login({ email, password })
          setTokens(auth)
          set({
            token: auth.accessToken,
            isAuthenticated: true,
            user: {
              id: auth.userId,
              email: auth.email,
              firstName: auth.fullName.split(' ')[0],
              lastName: auth.fullName.split(' ').slice(1).join(' '),
              fullName: auth.fullName,
              role: auth.role,
            },
          })
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const auth = await authApi.register(data)
          setTokens(auth)
          set({
            token: auth.accessToken,
            isAuthenticated: true,
            user: {
              id: auth.userId,
              email: auth.email,
              firstName: data.firstName,
              lastName: data.lastName,
              fullName: auth.fullName,
              role: auth.role,
              university: data.university,
              program: data.program,
            },
          })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        localStorage.removeItem('scholarhub_token')
        localStorage.removeItem('scholarhub_refresh')
        set({ user: null, token: null, isAuthenticated: false })
      },

      fetchUser: async () => {
        const token = localStorage.getItem('scholarhub_token')
        if (!token) return
        try {
          const user = await authApi.me()
          set({ user, isAuthenticated: true, token })
        } catch {
          get().logout()
        }
      },

      hasRole: (...roles) => {
        const user = get().user
        return user ? roles.includes(user.role) : false
      },
    }),
    {
      name: 'scholarhub-auth',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
)
