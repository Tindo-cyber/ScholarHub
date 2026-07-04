import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Trophy,
  Medal,
  BookOpen,
  Award,
  Rocket,
  FolderKanban,
  ExternalLink,
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Progress } from '@/components/ui/progress'
import { ProjectCard } from '@/components/projects/project-card'
import { usePortfolio, useProjects } from '@/hooks/use-data'
import type { Achievement } from '@/types'

const achievementIcons: Record<string, typeof Trophy> = {
  trophy: Trophy,
  medal: Medal,
  book: BookOpen,
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievementIcons[achievement.icon] ?? Award
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50">
        <Icon className="h-5 w-5 text-emerald-600" />
      </div>
      <div>
        <p className="font-medium">{achievement.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{achievement.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {new Date(achievement.date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const { data: portfolio, isLoading } = usePortfolio()
  const { data: projects } = useProjects()

  const deployedProjects = projects?.filter((p) => p.status === 'DEPLOYED') ?? []

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-16">
          <p className="text-sm font-medium text-emerald-600">Your Portfolio</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Academic Profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Automatically generated from your projects and achievements
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-16 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white shadow-soft-lg md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-100">Portfolio Score</p>
              <p className="mt-2 text-6xl font-bold tracking-tight">
                {isLoading ? '—' : portfolio?.score}
              </p>
              <p className="mt-2 text-emerald-100">Top 15% of students</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <FolderKanban className="h-5 w-5 text-emerald-200" />
                <p className="mt-3 text-2xl font-bold">{portfolio?.projectCount ?? 0}</p>
                <p className="text-sm text-emerald-100">Projects</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <Rocket className="h-5 w-5 text-emerald-200" />
                <p className="mt-3 text-2xl font-bold">{portfolio?.deployedCount ?? 0}</p>
                <p className="text-sm text-emerald-100">Deployments</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <section className="mb-16" aria-label="Skills">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio?.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.category}</span>
              </div>
              <Progress value={skill.level} />
              <p className="mt-2 text-right text-xs text-muted-foreground">{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16" aria-label="Projects">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Featured Projects
          </h2>
          <Link to="/projects" className="text-sm text-emerald-600 hover:underline">
            View all
          </Link>
        </div>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {projects?.slice(0, 4).map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {deployedProjects.length > 0 && (
        <section className="mb-16" aria-label="Deployments">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Live Deployments
          </h2>
          <div className="space-y-3">
            {deployedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"
              >
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.deploymentUrl}</p>
                </div>
                {project.deploymentUrl && (
                  <a
                    href={project.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emerald-600 hover:underline"
                  >
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-16" aria-label="Certificates">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Certificates
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {portfolio?.certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <Award className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="mt-3 font-medium">{cert.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(cert.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Achievements">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Achievements
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio?.achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </section>
    </div>
  )
}
