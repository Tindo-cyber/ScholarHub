import { api, unwrap } from '@/lib/api-client'
import type { Project, WorkspaceData, AIChatRequest, AIChatResponse } from '@/types'

export const workspaceApi = {
  get: async (): Promise<WorkspaceData> => {
    const res = await api.get('/workspace')
    return unwrap(res)
  },
}

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const res = await api.get('/projects')
    return unwrap(res)
  },

  getById: async (id: string): Promise<Project> => {
    const res = await api.get(`/projects/${id}`)
    return unwrap(res)
  },

  search: async (query: string): Promise<Project[]> => {
    const res = await api.get('/projects/search', { params: { q: query } })
    return unwrap(res)
  },

  getPublic: async (): Promise<Project[]> => {
    const res = await api.get('/projects/public')
    return unwrap(res)
  },
}

export const aiApi = {
  chat: async (request: AIChatRequest): Promise<AIChatResponse> => {
    const res = await api.post('/ai/chat', request)
    return unwrap(res)
  },
}
