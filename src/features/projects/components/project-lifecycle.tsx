import type { ProjectPhase } from '@/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  FileText,
  Search,
  Palette,
  Code2,
  TestTube,
  UserCheck,
  Rocket,
  Briefcase,
  Archive,
} from 'lucide-react'

const phases: { key: ProjectPhase; label: string; icon: typeof Lightbulb }[] = [
  { key: 'IDEA', label: 'Idea', icon: Lightbulb },
  { key: 'PROPOSAL', label: 'Proposal', icon: FileText },
  { key: 'RESEARCH', label: 'Research', icon: Search },
  { key: 'DESIGN', label: 'Design', icon: Palette },
  { key: 'DEVELOPMENT', label: 'Development', icon: Code2 },
  { key: 'TESTING', label: 'Testing', icon: TestTube },
  { key: 'SUPERVISOR_REVIEW', label: 'Review', icon: UserCheck },
  { key: 'DEPLOYMENT', label: 'Deploy', icon: Rocket },
  { key: 'PORTFOLIO', label: 'Portfolio', icon: Briefcase },
  { key: 'ARCHIVE', label: 'Archive', icon: Archive },
]

const phaseOrder = phases.map((p) => p.key)

interface ProjectLifecycleProps {
  currentPhase: ProjectPhase
  compact?: boolean
  className?: string
}

export function ProjectLifecycle({ currentPhase, compact, className }: ProjectLifecycleProps) {
  const currentIndex = phaseOrder.indexOf(currentPhase)

  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <motion.div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (phases.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {phases.map((phase, i) => {
          const isComplete = i < currentIndex
          const isCurrent = i === currentIndex
          const Icon = phase.icon

          return (
            <div
              key={phase.key}
              className={cn(
                'relative z-10 flex flex-col items-center',
                compact ? 'gap-1' : 'gap-2',
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 transition-all duration-300',
                  compact ? 'h-8 w-8' : 'h-10 w-10',
                  isComplete && 'border-emerald-500 bg-emerald-500 text-white',
                  isCurrent && 'border-emerald-500 bg-white text-emerald-600 shadow-soft dark:bg-card',
                  !isComplete && !isCurrent && 'border-border bg-card text-muted-foreground',
                )}
              >
                <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
              </div>
              {!compact && (
                <span
                  className={cn(
                    'hidden text-[10px] font-medium sm:block',
                    isCurrent ? 'text-emerald-600' : 'text-muted-foreground',
                  )}
                >
                  {phase.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { phases as PROJECT_PHASES }
