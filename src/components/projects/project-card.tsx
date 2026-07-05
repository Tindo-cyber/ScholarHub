import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Pencil, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/shared/components/status-badge'
import { formatRelativeDate } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-emerald-600">
            {project.title}
          </h3>
        </Link>
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{project.supervisorName}</span>
            <span className="text-xs text-muted-foreground">{formatRelativeDate(project.updatedAt)}</span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
          <Button variant="ghost" size="sm" asChild className="flex-1">
            <Link to={`/projects/${project.id}`}><Eye className="h-3.5 w-3.5" />View</Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1"><Pencil className="h-3.5 w-3.5" />Edit</Button>
          <Button variant="ghost" size="sm" className="flex-1"><Rocket className="h-3.5 w-3.5" />Deploy</Button>
        </div>
      </div>
    </motion.article>
  )
}

import { Upload, Sparkles, Rocket as RocketIcon, MessageSquare } from 'lucide-react'

const quickActions = [
  { label: 'Upload Project', icon: Upload, href: '/projects?action=upload', primary: true },
  { label: 'Ask InnovateX AI', icon: Sparkles, href: '/ai' },
  { label: 'Deploy Project', icon: RocketIcon, href: '/projects?action=deploy' },
  { label: 'View Feedback', icon: MessageSquare, href: '/notifications?filter=supervisor' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {quickActions.map((action, i) => (
        <motion.div key={action.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
          <Link
            to={action.href}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              action.primary
                ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30'
                : 'border-border bg-card hover:border-emerald-200 hover:shadow-soft'
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.primary ? 'bg-emerald-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
