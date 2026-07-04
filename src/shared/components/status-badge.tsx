import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types'
import { Badge } from '@/components/ui/badge'

const statusConfig: Record<
  ProjectStatus,
  { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' }
> = {
  DRAFT: { label: 'Draft', variant: 'secondary' },
  IN_REVIEW: { label: 'In Review', variant: 'info' },
  APPROVED: { label: 'Approved', variant: 'success' },
  DEPLOYED: { label: 'Deployed', variant: 'success' },
  REVISION: { label: 'Revision', variant: 'warning' },
  ARCHIVED: { label: 'Archived', variant: 'secondary' },
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status] ?? statusConfig.DRAFT
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function ScoreRing({
  score,
  label,
  size = 'md',
  className,
}: {
  score: number
  label: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizes = { sm: 'h-16 w-16 text-lg', md: 'h-24 w-24 text-2xl', lg: 'h-32 w-32 text-4xl' }
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full border-4 border-emerald-500/20 bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
          sizes[size],
        )}
      >
        {score}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
