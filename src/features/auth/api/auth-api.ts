import { api, unwrap } from '@/lib/api-client'
import type { AuthResponse, User } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  firstName: string
  lastName: string
  university?: string
  department?: string
  program?: string
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', payload)
    return unwrap(res)
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', payload)
    return unwrap(res)
  },

  me: async (): Promise<User> => {
    const res = await api.get('/auth/me')
    return unwrap(res)
  },
}
