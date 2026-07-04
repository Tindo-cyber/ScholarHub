import { FadeIn } from '@/components/ui/motion'
import { ScoreRing } from '@/shared/components/status-badge'
import { ProjectHealthCard } from '@/features/projects/components/project-health-card'
import { useAnalytics, useProject } from '@/hooks/use-data'

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useAnalytics()
  const { data: currentProject } = useProject('b0000000-0000-0000-0000-000000000001')

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  const metrics = analytics
    ? [
        { score: analytics.innovationScore, label: 'Innovation Score' },
        { score: analytics.portfolioScore, label: 'Portfolio Score' },
        { score: analytics.projectHealth, label: 'Project Health' },
        { score: analytics.researchProgress, label: 'Research Progress' },
        { score: analytics.deploymentSuccess, label: 'Deployment Success' },
        { score: analytics.studentGrowth, label: 'Student Growth' },
      ]
    : []

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Analytics</h1>
          <p className="mt-2 text-muted-foreground">Your innovation journey at a glance</p>
        </header>
      </FadeIn>

      <section className="mb-16 flex flex-wrap justify-center gap-8 md:gap-12" aria-label="Key metrics">
        {metrics.map((m) => (
          <ScoreRing key={m.label} score={m.score} label={m.label} size="md" />
        ))}
      </section>

      {currentProject?.health && (
        <section aria-label="Project health detail">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Current Project Health
          </h2>
          <ProjectHealthCard health={currentProject.health} />
        </section>
      )}
    </div>
  )
}
