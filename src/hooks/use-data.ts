import { useQuery, useMutation } from '@tanstack/react-query'
import { projectsApi, workspaceApi, aiApi, notificationsApi, portfolioApi } from '@/lib/api'
import {
  projects as mockProjects,
  currentUser,
  supervisorFeedback,
  notifications,
  portfolioData,
  conversations,
  marketplaceListings,
  startups,
  analyticsData,
  getProjectById,
  getProjectsUnderReview,
  getNextDeadline,
  getUnreadNotificationCount,
} from '@/lib/mock-data'
import type { AIChatRequest } from '@/types'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function useWorkspace() {
  return useQuery({
    queryKey: ['workspace'],
    queryFn: async () => {
      if (!USE_MOCK) return workspaceApi.get()
      await delay(250)
      const underReview = getProjectsUnderReview()
      const deadline = getNextDeadline()
      return {
        currentProject: mockProjects.find((p) => p.status !== 'DEPLOYED' && p.status !== 'ARCHIVED') ?? null,
        projectsUnderReview: underReview,
        unreadFeedback: supervisorFeedback.filter((f) => f.unread).map((f) => ({
          projectId: f.projectId,
          projectName: f.projectName,
          supervisor: f.supervisor,
          message: f.message,
          date: f.date,
        })),
        nextDeadline: deadline ? {
          projectId: deadline.project.id,
          projectName: deadline.project.title,
          daysLeft: deadline.daysLeft,
        } : null,
        aiSuggestions: [
          'Review your documentation completeness',
          'Generate Chapter 1 outline',
          'Prepare viva questions',
          'Improve your project abstract',
        ],
        unreadNotifications: getUnreadNotificationCount(),
        innovationScore: 82,
        portfolioScore: portfolioData.score,
      }
    },
  })
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!USE_MOCK) return projectsApi.getAll()
      await delay(300)
      return mockProjects
    },
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!USE_MOCK) return projectsApi.getById(id)
      await delay(200)
      const project = getProjectById(id)
      if (!project) throw new Error('Project not found')
      return project
    },
    enabled: !!id,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      await delay(100)
      return currentUser
    },
  })
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!USE_MOCK) return notificationsApi.getAll()
      await delay(200)
      return notifications
    },
  })
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      if (!USE_MOCK) {
        const data = await portfolioApi.get()
        return { ...data, achievements: portfolioData.achievements }
      }
      await delay(300)
      return portfolioData
    },
  })
}

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      await delay(200)
      return conversations
    },
  })
}

export function useMarketplaceListings() {
  return useQuery({
    queryKey: ['marketplace'],
    queryFn: async () => {
      await delay(300)
      return marketplaceListings
    },
  })
}

export function useMarketplace() {
  return useQuery({
    queryKey: ['marketplace-public'],
    queryFn: async () => {
      if (!USE_MOCK) return projectsApi.getPublic()
      await delay(300)
      return marketplaceListings
    },
  })
}

export function useStartups() {
  return useQuery({
    queryKey: ['startups'],
    queryFn: async () => {
      await delay(200)
      return startups
    },
  })
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      await delay(250)
      return analyticsData
    },
  })
}

export function useSearchProjects(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!USE_MOCK) return projectsApi.search(query)
      await delay(300)
      const q = query.toLowerCase()
      return mockProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.supervisorName?.toLowerCase().includes(q),
      )
    },
    enabled: query.length >= 2,
  })
}

export function useAIChat() {
  return useMutation({
    mutationFn: async (request: AIChatRequest) => {
      if (!USE_MOCK) return aiApi.chat(request)
      await delay(800)
      return {
        conversationId: request.conversationId ?? crypto.randomUUID(),
        reply: "I'm Scholar AI, your academic mentor. I can help with documentation, code review, viva preparation, and more. What would you like to work on?",
        title: request.message.slice(0, 50),
      }
    },
  })
}

// Legacy alias
export function useHomeData() {
  return useWorkspace()
}

export function useSupervisorFeedback() {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      await delay(200)
      return supervisorFeedback
    },
  })
}
