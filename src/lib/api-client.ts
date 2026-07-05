import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('innovatex_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('innovatex_token')
      localStorage.removeItem('innovatex_refresh')
      if (!window.location.pathname.includes('/auth')) {
        const base = import.meta.env.BASE_URL
        window.location.href = `${base}auth/login`.replace(/\/{2,}/g, '/')
      }
    }
    return Promise.reject(error)
  },
)

export function unwrap<T>(response: { data: ApiResponse<T> }): T {
  return response.data.data
}
