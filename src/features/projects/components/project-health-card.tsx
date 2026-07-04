import type { ProjectHealth } from '@/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const healthMetrics: { key: keyof ProjectHealth; label: string }[] = [
  { key: 'documentation', label: 'Documentation' },
  { key: 'testing', label: 'Testing' },
  { key: 'codeQuality', label: 'Code Quality' },
  { key: 'deployment', label: 'Deployment' },
  { key: 'presentation', label: 'Presentation' },
  { key: 'research', label: 'Research' },
  { key: 'security', label: 'Security' },
]

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-500'
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-red-400'
}

interface ProjectHealthCardProps {
  health: ProjectHealth
  className?: string
}

export function ProjectHealthCard({ health, className }: ProjectHealthCardProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card p-6', className)}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Project Health</p>
          <p className={cn('text-4xl font-bold tracking-tight', getScoreColor(health.overallScore))}>
            {health.overallScore}
          </p>
        </div>
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
            <motion.circle
              cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6"
              strokeLinecap="round"
              className={getScoreColor(health.overallScore)}
              strokeDasharray={`${(health.overallScore / 100) * 213.6} 213.6`}
              initial={{ strokeDasharray: '0 213.6' }}
              animate={{ strokeDasharray: `${(health.overallScore / 100) * 213.6} 213.6` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute text-sm font-semibold">{health.overallScore}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {healthMetrics.map((metric, i) => {
          const value = health[metric.key] as number
          if (metric.key === 'overallScore') return null
          return (
            <div key={metric.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className={cn('font-medium', getScoreColor(value))}>{value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className={cn('h-full rounded-full', getBarColor(value))}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
