import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import { FadeIn } from '@/components/ui/motion'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/shared/components/status-badge'
import { useSearchProjects } from '@/hooks/use-data'

const suggestions = [
  'Find Java projects using Spring Boot',
  'Find AI research from Computer Science',
  'Find projects supervised by Dr Chen',
  'Find deployed mobile applications',
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const { data: results, isLoading } = useSearchProjects(query)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search</h1>
          <p className="mt-2 text-muted-foreground">Natural language search across all projects</p>
        </header>
      </FadeIn>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about projects..."
          className="h-14 rounded-2xl pl-12 text-base"
          aria-label="Search projects"
          autoFocus
        />
        <Sparkles className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" />
      </div>

      {query.length < 2 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try searching for:</p>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s.split('Find ')[1] ?? s)}
              className="block w-full rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {query.length >= 2 && (
        <div className="space-y-3">
          {isLoading && <p className="text-center text-muted-foreground">Searching...</p>}
          {results?.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-emerald-200 hover:shadow-soft"
            >
              {project.imageUrl && (
                <img src={project.imageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{project.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </Link>
          ))}
          {!isLoading && results?.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No projects found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  )
}
