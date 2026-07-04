export type UserRole =
  | 'STUDENT'
  | 'SUPERVISOR'
  | 'ADMINISTRATOR'
  | 'INDUSTRY_PARTNER'
  | 'STARTUP_MENTOR'
  | 'UNIVERSITY_ADMIN'

export type ProjectStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'DEPLOYED'
  | 'REVISION'
  | 'ARCHIVED'

export type ProjectPhase =
  | 'IDEA'
  | 'PROPOSAL'
  | 'RESEARCH'
  | 'DESIGN'
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'SUPERVISOR_REVIEW'
  | 'DEPLOYMENT'
  | 'PORTFOLIO'
  | 'ARCHIVE'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  role: UserRole
  university?: string
  department?: string
  program?: string
  avatarUrl?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  userId: string
  email: string
  fullName: string
  role: UserRole
}

export interface ProjectHealth {
  documentation: number
  testing: number
  codeQuality: number
  deployment: number
  presentation: number
  research: number
  security: number
  overallScore: number
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  phase: ProjectPhase
  progress: number
  studentId: string
  studentName: string
  supervisorId?: string
  supervisorName?: string
  department?: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  deploymentUrl?: string
  deadline?: string
  isPublic: boolean
  innovationScore: number
  health?: ProjectHealth
  createdAt: string
  updatedAt: string
}

export interface WorkspaceData {
  currentProject: Project | null
  projectsUnderReview: Project[]
  unreadFeedback: FeedbackSummary[]
  nextDeadline: DeadlineInfo | null
  aiSuggestions: string[]
  unreadNotifications: number
  innovationScore: number
  portfolioScore: number
}

export interface FeedbackSummary {
  projectId: string
  projectName: string
  supervisor: string
  message: string
  date: string
}

export interface DeadlineInfo {
  projectId: string
  projectName: string
  daysLeft: number
}

export interface Notification {
  id: string
  type: 'supervisor' | 'system' | 'deployment' | 'ai' | 'deadline' | 'industry'
  title: string
  message: string
  date: string
  read: boolean
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
}

export interface PortfolioData {
  score: number
  skills: Skill[]
  certificates: Certificate[]
  achievements: Achievement[]
  deployedCount: number
  projectCount: number
}

export interface Conversation {
  id: string
  title: string
  lastMessage: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface MarketplaceListing {
  id: string
  projectId: string
  title: string
  summary: string
  category: string
  technologies: string[]
  studentName: string
  department: string
  imageUrl?: string
  viewCount: number
  isFeatured: boolean
}

export interface Startup {
  id: string
  name: string
  tagline: string
  description: string
  stage: 'ideation' | 'validation' | 'mvp' | 'growth' | 'scale'
  projectId: string
  founderName: string
  createdAt: string
}

export interface AnalyticsData {
  innovationScore: number
  portfolioScore: number
  projectHealth: number
  researchProgress: number
  deploymentSuccess: number
  studentGrowth: number
}

export type ProjectTab =
  | 'overview'
  | 'documentation'
  | 'deployment'
  | 'analytics'
  | 'feedback'
  | 'files'
  | 'timeline'
  | 'comments'

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface AIChatRequest {
  conversationId?: string
  projectId?: string
  message: string
  context?: string
}

export interface AIChatResponse {
  conversationId: string
  reply: string
  title: string
}
