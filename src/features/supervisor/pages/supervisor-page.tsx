import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/motion'
import { StatusBadge } from '@/shared/components/status-badge'
import { Progress } from '@/components/ui/progress'
import { useProjects } from '@/hooks/use-data'
import { formatRelativeDate } from '@/lib/utils'
import { UserCheck, MessageSquare, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SupervisorPage() {
  const { data: projects, isLoading } = useProjects()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-12">
          <div className="mb-2 flex items-center gap-2 text-emerald-600">
            <UserCheck className="h-5 w-5" />
            <span className="text-sm font-medium">Supervisor Workspace</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Review & Guide</h1>
          <p className="mt-2 text-muted-foreground">
            Manage student projects, approve milestones, and provide feedback
          </p>
        </header>
      </FadeIn>

      <div className="mb-8 flex gap-3">
        <Button variant="default" size="sm">Pending Review (3)</Button>
        <Button variant="outline" size="sm">All Projects</Button>
        <Button variant="outline" size="sm">Meetings</Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{project.studentName}</p>
                <div className="mt-3 max-w-xs">
                  <Progress value={project.progress} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatRelativeDate(project.updatedAt)}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/projects/${project.id}?tab=feedback`}>
                    <MessageSquare className="h-3.5 w-3.5" /> Feedback
                  </Link>
                </Button>
                <Button size="sm">
                  <CheckCircle className="h-3.5 w-3.5" /> Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
