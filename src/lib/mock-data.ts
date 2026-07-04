import type {
  Achievement,
  AnalyticsData,
  Certificate,
  Conversation,
  MarketplaceListing,
  Notification,
  PortfolioData,
  Project,
  Skill,
  Startup,
  User,
} from '@/types'

export const currentUser: User = {
  id: 'a0000000-0000-0000-0000-000000000001',
  email: 'alex.morgan@university.edu',
  firstName: 'Alex',
  lastName: 'Morgan',
  fullName: 'Alex Morgan',
  role: 'STUDENT',
  university: 'Stanford University',
  department: 'Computer Science',
  program: 'MSc Computer Science',
}

export const projects: Project[] = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    title: 'Neural Network Optimizer',
    description: 'A novel approach to optimizing deep learning models for edge devices using adaptive quantization techniques.',
    status: 'IN_REVIEW',
    phase: 'SUPERVISOR_REVIEW',
    progress: 78,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorId: 'a0000000-0000-0000-0000-000000000002',
    supervisorName: 'Dr. Sarah Chen',
    department: 'Computer Science',
    technologies: ['Python', 'TensorFlow', 'Machine Learning'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    deadline: '2026-07-15',
    isPublic: false,
    innovationScore: 82,
    health: { documentation: 85, testing: 70, codeQuality: 88, deployment: 60, presentation: 75, research: 90, security: 72, overallScore: 79 },
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-07-02T14:30:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    title: 'Campus Connect API',
    description: 'RESTful microservices architecture for university event management and student collaboration.',
    status: 'DEPLOYED',
    phase: 'PORTFOLIO',
    progress: 100,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorId: 'a0000000-0000-0000-0000-000000000002',
    supervisorName: 'Prof. James Wright',
    department: 'Computer Science',
    technologies: ['Node.js', 'PostgreSQL', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    deploymentUrl: 'https://campus-connect.demo.app',
    isPublic: true,
    innovationScore: 91,
    health: { documentation: 95, testing: 92, codeQuality: 90, deployment: 100, presentation: 88, research: 85, security: 94, overallScore: 92 },
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-06-28T09:15:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    title: 'EcoTrack Mobile App',
    description: 'Cross-platform mobile application for tracking personal carbon footprint with gamification.',
    status: 'REVISION',
    phase: 'DEVELOPMENT',
    progress: 65,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorId: 'a0000000-0000-0000-0000-000000000002',
    supervisorName: 'Dr. Sarah Chen',
    department: 'Computer Science',
    technologies: ['React Native', 'Firebase'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    deadline: '2026-07-20',
    isPublic: false,
    innovationScore: 74,
    health: { documentation: 60, testing: 55, codeQuality: 70, deployment: 40, presentation: 65, research: 75, security: 58, overallScore: 60 },
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-07-01T16:45:00Z',
  },
  {
    id: '4',
    title: 'Quantum Simulator',
    description: 'Browser-based quantum circuit simulator with visual programming interface.',
    status: 'DRAFT',
    phase: 'DESIGN',
    progress: 42,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorName: 'Prof. Elena Vasquez',
    department: 'Computer Science',
    technologies: ['TypeScript', 'WebGL', 'Quantum Computing'],
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    deadline: '2026-08-01',
    isPublic: false,
    innovationScore: 68,
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-06-25T11:00:00Z',
  },
  {
    id: '5',
    title: 'HealthSync Dashboard',
    description: 'Real-time health monitoring dashboard with predictive analytics.',
    status: 'APPROVED',
    phase: 'DEPLOYMENT',
    progress: 92,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorName: 'Dr. Michael Park',
    department: 'Computer Science',
    technologies: ['React', 'D3.js', 'Healthcare'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    deadline: '2026-07-10',
    isPublic: false,
    innovationScore: 88,
    createdAt: '2026-02-15T00:00:00Z',
    updatedAt: '2026-07-03T08:20:00Z',
  },
  {
    id: '6',
    title: 'BlockChain Voting System',
    description: 'Secure voting system using blockchain for university elections.',
    status: 'IN_REVIEW',
    phase: 'SUPERVISOR_REVIEW',
    progress: 88,
    studentId: currentUser.id,
    studentName: currentUser.fullName,
    supervisorName: 'Prof. James Wright',
    department: 'Computer Science',
    technologies: ['Blockchain', 'Solidity', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938e0e?w=600&h=400&fit=crop',
    deadline: '2026-07-12',
    isPublic: true,
    innovationScore: 85,
    createdAt: '2026-03-10T00:00:00Z',
    updatedAt: '2026-07-03T19:00:00Z',
  },
]

export const supervisorFeedback = [
  {
    id: '1',
    projectId: 'b0000000-0000-0000-0000-000000000001',
    projectName: 'Neural Network Optimizer',
    supervisor: 'Dr. Sarah Chen',
    message: 'Excellent progress on the quantization module. Please expand the benchmark section.',
    date: '2026-07-02T14:30:00Z',
    unread: true,
  },
  {
    id: '2',
    projectId: 'b0000000-0000-0000-0000-000000000003',
    projectName: 'EcoTrack Mobile App',
    supervisor: 'Dr. Sarah Chen',
    message: 'The UI redesign looks great. Revise the data persistence layer before resubmitting.',
    date: '2026-07-01T16:45:00Z',
    unread: true,
  },
]

export const notifications: Notification[] = [
  { id: '1', type: 'supervisor', title: 'New feedback received', message: 'Dr. Sarah Chen commented on Neural Network Optimizer', date: '2026-07-02T14:30:00Z', read: false },
  { id: '2', type: 'deployment', title: 'Deployment successful', message: 'Campus Connect API is now live', date: '2026-06-28T09:15:00Z', read: false },
  { id: '3', type: 'ai', title: 'AI analysis complete', message: 'Documentation review for EcoTrack is ready', date: '2026-07-01T10:00:00Z', read: true },
  { id: '4', type: 'deadline', title: 'Deadline approaching', message: 'Neural Network Optimizer due in 11 days', date: '2026-07-03T00:00:00Z', read: false },
  { id: '5', type: 'industry', title: 'Industry interest', message: 'TechCorp viewed your BlockChain Voting project', date: '2026-07-03T12:00:00Z', read: false },
]

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'Python', level: 88, category: 'Backend' },
  { name: 'Machine Learning', level: 82, category: 'AI/ML' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Docker', level: 70, category: 'DevOps' },
]

export const certificates: Certificate[] = [
  { id: '1', name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025-11-15' },
  { id: '2', name: 'Google ML Engineer', issuer: 'Google Cloud', date: '2026-03-20' },
  { id: '3', name: 'Meta Frontend Developer', issuer: 'Meta', date: '2025-09-08' },
]

export const achievements: Achievement[] = [
  { id: '1', title: 'Top Performer', description: 'Ranked in top 5% of graduating class', date: '2026-05-01', icon: 'trophy' },
  { id: '2', title: 'Hackathon Winner', description: '1st place at University Innovation Challenge', date: '2026-02-14', icon: 'medal' },
  { id: '3', title: 'Published Research', description: 'Co-authored paper on edge ML optimization', date: '2026-04-10', icon: 'book' },
]

export const portfolioData: PortfolioData = {
  score: 87,
  skills,
  certificates,
  achievements,
  deployedCount: 2,
  projectCount: 6,
}

export const conversations: Conversation[] = [
  { id: '1', title: 'Abstract generation for NN Optimizer', lastMessage: 'Here is a refined abstract...', updatedAt: '2026-07-03T10:00:00Z' },
  { id: '2', title: 'Code review — EcoTrack API', lastMessage: 'I found three potential memory leaks...', updatedAt: '2026-07-02T15:30:00Z' },
  { id: '3', title: 'Presentation outline', lastMessage: 'Slide 1: Problem Statement...', updatedAt: '2026-06-28T09:00:00Z' },
]

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: '1', projectId: 'b0000000-0000-0000-0000-000000000002', title: 'Campus Connect API',
    summary: 'Microservices platform for university event management and student collaboration.',
    category: 'Backend', technologies: ['Node.js', 'PostgreSQL', 'Docker'],
    studentName: 'Alex Morgan', department: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    viewCount: 342, isFeatured: true,
  },
  {
    id: '2', projectId: '6', title: 'BlockChain Voting System',
    summary: 'Secure and transparent voting system for university elections using blockchain.',
    category: 'Security', technologies: ['Blockchain', 'Solidity'],
    studentName: 'Alex Morgan', department: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938e0e?w=600&h=400&fit=crop',
    viewCount: 189, isFeatured: false,
  },
  {
    id: '3', projectId: 'ext-1', title: 'AgriSense IoT Platform',
    summary: 'Smart farming solution using IoT sensors and ML for crop optimization.',
    category: 'IoT', technologies: ['Python', 'Arduino', 'TensorFlow'],
    studentName: 'Maria Santos', department: 'Electrical Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    viewCount: 256, isFeatured: true,
  },
]

export const startups: Startup[] = [
  {
    id: '1', name: 'CampusConnect Inc.', tagline: 'Connecting university communities',
    description: 'Spinning off the Campus Connect API into a SaaS platform for universities worldwide.',
    stage: 'mvp', projectId: 'b0000000-0000-0000-0000-000000000002',
    founderName: 'Alex Morgan', createdAt: '2026-06-01T00:00:00Z',
  },
]

export const analyticsData: AnalyticsData = {
  innovationScore: 82,
  portfolioScore: 87,
  projectHealth: 77,
  researchProgress: 85,
  deploymentSuccess: 92,
  studentGrowth: 78,
}

export const aiSuggestions = [
  'Generate Abstract', 'Improve Documentation', 'Explain Code',
  'Generate Presentation', 'Review Proposal', 'Prepare Viva Questions',
]

export const aiWorkspaceSuggestions = [
  'Generate code for REST API endpoints', 'Review my documentation',
  'Explain this error message', 'Help me write Chapter 1',
  'Create a deployment checklist', 'Generate ERD for my database',
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectsUnderReview(): Project[] {
  return projects.filter((p) => p.status === 'IN_REVIEW')
}

export function getNextDeadline(): { project: Project; daysLeft: number } | null {
  const withDeadlines = projects
    .filter((p) => p.deadline)
    .map((p) => ({
      project: p,
      daysLeft: Math.ceil((new Date(p.deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    }))
    .filter((d) => d.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
  return withDeadlines[0] ?? null
}

export function getUnreadNotificationCount(): number {
  return notifications.filter((n) => !n.read).length
}
