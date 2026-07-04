import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Settings2,
  Rocket,
  Sparkles,
  CheckCheck,
  Clock,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/motion'
import { useNotifications } from '@/hooks/use-data'
import { formatRelativeDate, cn } from '@/lib/utils'
import type { Notification } from '@/types'

type FilterType = 'all' | Notification['type']

const filters: { label: string; value: FilterType; icon: typeof MessageSquare }[] = [
  { label: 'All', value: 'all', icon: CheckCheck },
  { label: 'Supervisor', value: 'supervisor', icon: MessageSquare },
  { label: 'System', value: 'system', icon: Settings2 },
  { label: 'Deployments', value: 'deployment', icon: Rocket },
  { label: 'AI', value: 'ai', icon: Sparkles },
  { label: 'Deadlines', value: 'deadline', icon: Clock },
  { label: 'Industry', value: 'industry', icon: Building2 },
]

const typeIcons: Record<Notification['type'], typeof MessageSquare> = {
  supervisor: MessageSquare,
  system: Settings2,
  deployment: Rocket,
  ai: Sparkles,
  deadline: Clock,
  industry: Building2,
}

const typeColors: Record<Notification['type'], string> = {
  supervisor: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
  system: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  deployment: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
  ai: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
  deadline: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
  industry: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400',
}

function NotificationItem({ notification, index }: { notification: Notification; index: number }) {
  const Icon = typeIcons[notification.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'flex items-start gap-4 rounded-2xl border p-5 transition-all hover:shadow-soft',
        notification.read
          ? 'border-border bg-card'
          : 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/10',
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          typeColors[notification.type],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('font-medium', !notification.read && 'text-foreground')}>
            {notification.title}
          </p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatRelativeDate(notification.date)}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
      </div>
      {!notification.read && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-label="Unread" />
      )}
    </motion.div>
  )
}

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filtered =
    activeFilter === 'all'
      ? notifications
      : notifications?.filter((n) => n.type === activeFilter)

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0

  const grouped = filtered?.reduce(
    (acc, n) => {
      const date = new Date(n.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
      if (!acc[date]) acc[date] = []
      acc[date].push(n)
      return acc
    },
    {} as Record<string, Notification[]>,
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Notifications</h1>
            <p className="mt-2 text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up'}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        </div>
      </FadeIn>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              activeFilter === filter.value
                ? 'bg-emerald-500 text-white shadow-soft'
                : 'bg-secondary text-muted-foreground hover:bg-accent',
            )}
            aria-pressed={activeFilter === filter.value}
          >
            <filter.icon className="h-3.5 w-3.5" />
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {grouped &&
            Object.entries(grouped).map(([date, items]) => (
              <section key={date}>
                <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {date}
                </h2>
                <div className="space-y-3">
                  {items.map((notification, i) => (
                    <NotificationItem key={notification.id} notification={notification} index={i} />
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  )
}
