import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/projects/project-card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { useProjects } from '@/hooks/use-data'
import type { ProjectStatus } from '@/types'
import { cn } from '@/lib/utils'

const filters: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Deployed', value: 'DEPLOYED' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Revision', value: 'REVISION' },
]

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'all'>('all')

  const filtered = activeFilter === 'all' ? projects : projects?.filter((p) => p.status === activeFilter)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Projects</h1>
            <p className="mt-2 text-muted-foreground">{projects?.length ?? 0} projects in your workspace</p>
          </div>
          <Button size="lg"><Plus className="h-4 w-4" />New Project</Button>
        </div>
      </FadeIn>

      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
              activeFilter === filter.value
                ? 'bg-emerald-500 text-white shadow-soft'
                : 'bg-secondary text-muted-foreground hover:bg-accent',
            )}
            aria-pressed={activeFilter === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  )
}
