import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Rocket, Pencil, ExternalLink, GitBranch, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/shared/components/status-badge'
import { ProjectLifecycle } from '@/features/projects/components/project-lifecycle'
import { ProjectHealthCard } from '@/features/projects/components/project-health-card'
import { FadeIn } from '@/components/ui/motion'
import { useProject } from '@/hooks/use-data'
import { formatRelativeDate } from '@/lib/utils'
import type { ProjectTab } from '@/types'

const tabItems: { value: ProjectTab; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'deployment', label: 'Deployment' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'files', label: 'Files' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'comments', label: 'Comments' },
]

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const defaultTab = (searchParams.get('tab') as ProjectTab) || 'overview'
  const { data: project, isLoading, error } = useProject(id!)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-secondary" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="text-lg font-medium">Project not found</p>
        <Button variant="link" asChild className="mt-4">
          <Link to="/projects">Back to projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-12">
      <FadeIn>
        <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft-lg">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <StatusBadge status={project.status} />
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{project.title}</h1>
              <p className="mt-2 max-w-2xl text-white/80">{project.description}</p>
            </div>
          </div>

          <div className="border-b border-border px-8 py-6">
            <p className="mb-4 text-sm font-medium text-muted-foreground">Project Lifecycle</p>
            <ProjectLifecycle currentPhase={project.phase} compact />
          </div>

          <div className="flex flex-wrap items-center gap-6 px-8 py-5">
            <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-muted-foreground" /><span>{project.supervisorName}</span></div>
            <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>Updated {formatRelativeDate(project.updatedAt)}</span></div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
              <Button size="sm"><Rocket className="h-3.5 w-3.5" /> Deploy</Button>
              {project.deploymentUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.deploymentUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5" /> Live</a>
                </Button>
              )}
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-semibold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      <Tabs defaultValue={defaultTab} className="mt-10">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {tabItems.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">Project Summary</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            </div>
            {project.health ? (
              <ProjectHealthCard health={project.health} />
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">Repository</h3>
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary p-4">
                  <GitBranch className="h-5 w-5 text-emerald-600" />
                  <div><p className="text-sm font-medium">main</p><p className="text-xs text-muted-foreground">Last commit 2 hours ago</p></div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documentation">
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-lg font-medium">Documentation</p>
            <p className="mt-2 text-sm text-muted-foreground">Reports, README, and technical specs</p>
          </div>
        </TabsContent>

        <TabsContent value="deployment">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">Deployment Status</h3>
            {project.deploymentUrl ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /><span className="text-sm font-medium text-emerald-600">Live</span></div>
                <a href={project.deploymentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline">{project.deploymentUrl}<ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Not deployed yet. Click Deploy to get started.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          {project.health ? <ProjectHealthCard health={project.health} /> : <p className="text-muted-foreground">No analytics available yet.</p>}
        </TabsContent>

        <TabsContent value="feedback">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-medium">{project.supervisorName}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Great progress on this project. Please ensure all documentation is complete before the final submission deadline.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="files">
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-lg font-medium">Project Repository</p>
            <p className="mt-2 text-sm text-muted-foreground">Source code, reports, images, videos, presentations, and database dumps</p>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="space-y-4">
            {['Proposal', 'Chapter 1', 'Chapter 2', 'Prototype', 'Testing', 'Deployment', 'Presentation'].map((event, i) => (
              <div key={event} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full ${i <= 4 ? 'bg-emerald-500' : 'bg-border'}`} />
                  {i < 6 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6"><p className="text-sm font-medium">{event}</p></div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-lg font-medium">Comments</p>
            <p className="mt-2 text-sm text-muted-foreground">Team discussions and comment threads</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
