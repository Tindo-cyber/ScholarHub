import { api, unwrap } from '@/lib/api-client'
import type {
  Project,
  WorkspaceData,
  AIChatRequest,
  AIChatResponse,
  Notification,
  PortfolioData,
} from '@/types'

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

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const res = await api.get('/notifications')
    const data = unwrap<Array<{
      id: string
      type: string
      title: string
      message: string
      read: boolean
      date: string
    }>>(res)
    return data.map((n) => ({
      id: n.id,
      type: n.type as Notification['type'],
      title: n.title,
      message: n.message,
      read: n.read,
      date: n.date,
    }))
  },

  markAllRead: async (): Promise<void> => {
    await api.post('/notifications/read-all')
  },
}

export const portfolioApi = {
  get: async (): Promise<PortfolioData> => {
    const res = await api.get('/portfolio')
    const data = unwrap<{
      score: number
      skills: Array<{ name: string; category: string; level: number }>
      certificates: Array<{ name: string; issuer: string; date: string }>
      projectCount: number
      deployedCount: number
    }>(res)
    return {
      score: data.score,
      skills: data.skills.map((s) => ({ name: s.name, category: s.category, level: s.level })),
      certificates: data.certificates.map((c, i) => ({
        id: String(i + 1),
        name: c.name,
        issuer: c.issuer,
        date: c.date,
      })),
      achievements: [],
      projectCount: data.projectCount,
      deployedCount: data.deployedCount,
    }
  },
}

export const aiApi = {
  chat: async (request: AIChatRequest): Promise<AIChatResponse> => {
    const res = await api.post('/ai/chat', request)
    return unwrap(res)
  },
}
