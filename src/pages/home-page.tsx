import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/motion'
import { AICommandBar } from '@/components/ai/ai-command-bar'
import { QuickActions } from '@/components/projects/project-card'
import { ProjectLifecycle } from '@/features/projects/components/project-lifecycle'
import { ProjectHealthCard } from '@/features/projects/components/project-health-card'
import { ScoreRing } from '@/shared/components/status-badge'
import { useCurrentUser, useWorkspace } from '@/hooks/use-data'
import { getGreeting } from '@/lib/utils'
import { MessageSquare, Clock, Sparkles, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const { data: user } = useCurrentUser()
  const { data: workspace, isLoading } = useWorkspace()
  const greeting = getGreeting()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-16">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{greeting},</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
            {user?.firstName ?? 'Innovator'}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {import.meta.env.VITE_APP_TAGLINE || 'Build. Innovate. Launch.'}
          </p>
        </header>
      </FadeIn>

      {/* Continue Working — Current Project */}
      {workspace?.currentProject && (
        <FadeIn delay={0.1}>
          <section className="mb-16" aria-label="Continue working">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Continue Working
              </h2>
              <Link
                to={`/projects/${workspace.currentProject.id}`}
                className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:underline"
              >
                Open project <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft-lg">
              <div className="p-8">
                <h3 className="text-2xl font-bold tracking-tight">{workspace.currentProject.title}</h3>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {workspace.currentProject.description}
                </p>
                <div className="mt-8">
                  <ProjectLifecycle currentPhase={workspace.currentProject.phase} />
                </div>
              </div>
              {workspace.currentProject.health && (
                <div className="border-t border-border p-8">
                  <ProjectHealthCard health={workspace.currentProject.health} />
                </div>
              )}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Scores */}
      {!isLoading && workspace && (
        <section className="mb-16 flex justify-center gap-12" aria-label="Scores">
          <ScoreRing score={workspace.innovationScore} label="Innovation Score" />
          <ScoreRing score={workspace.portfolioScore} label="Portfolio Score" />
        </section>
      )}

      {/* Workspace Items */}
      <section className="mb-16 grid gap-4 md:grid-cols-3" aria-label="Workspace overview">
        <Link
          to="/projects?status=IN_REVIEW"
          className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 transition-all hover:shadow-soft dark:border-emerald-800 dark:bg-emerald-950/20"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Under Review</p>
          <p className="mt-2 text-2xl font-bold">{workspace?.projectsUnderReview.length ?? '—'}</p>
        </Link>
        <Link
          to="/notifications?filter=supervisor"
          className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-soft"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Feedback</p>
          <p className="mt-2 text-2xl font-bold">{workspace?.unreadFeedback.length ?? '—'} unread</p>
        </Link>
        <Link
          to={workspace?.nextDeadline ? `/projects/${workspace.nextDeadline.projectId}` : '#'}
          className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-soft"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Next Deadline</p>
          <p className="mt-2 text-lg font-bold">
            {workspace?.nextDeadline
              ? `${workspace.nextDeadline.daysLeft} days`
              : 'None'}
          </p>
        </Link>
      </section>

      {/* Feedback & Deadlines */}
      {!isLoading && workspace && (
        <section className="mb-16 space-y-3" aria-label="Recent activity">
          {workspace.unreadFeedback.slice(0, 2).map((fb) => (
            <Link
              key={fb.projectId + fb.date}
              to={`/projects/${fb.projectId}?tab=feedback`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-emerald-200 hover:shadow-soft"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{fb.projectName}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{fb.message}</p>
                <p className="mt-2 text-xs text-emerald-600">{fb.supervisor}</p>
              </div>
            </Link>
          ))}
          {workspace.nextDeadline && (
            <Link
              to={`/projects/${workspace.nextDeadline.projectId}`}
              className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900 dark:bg-amber-950/20"
            >
              <Clock className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium">{workspace.nextDeadline.projectName}</p>
                <p className="text-sm text-muted-foreground">Due in {workspace.nextDeadline.daysLeft} days</p>
              </div>
            </Link>
          )}
        </section>
      )}

      {/* AI Suggestions */}
      {workspace?.aiSuggestions && (
        <section className="mb-16" aria-label="AI suggestions">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">AI Suggestions</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {workspace.aiSuggestions.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {s}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <section className="mb-16" aria-label="Quick actions">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">Quick Actions</h2>
        <QuickActions />
      </section>

      <section aria-label="InnovateX AI">
        <AICommandBar />
      </section>
    </div>
  )
}
