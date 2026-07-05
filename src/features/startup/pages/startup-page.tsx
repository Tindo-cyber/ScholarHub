import { motion } from 'framer-motion'
import { Rocket, Users, Target, DollarSign, Lightbulb, Plus } from 'lucide-react'
import { FadeIn } from '@/components/ui/motion'
import { Button } from '@/components/ui/button'
import { useStartups } from '@/hooks/use-data'

const incubatorFeatures = [
  { icon: Target, title: 'Roadmap', description: 'Visual milestone tracking from idea to scale' },
  { icon: Users, title: 'Team Management', description: 'Invite co-founders and assign roles' },
  { icon: Lightbulb, title: 'Business Model Canvas', description: 'Interactive canvas for your business model' },
  { icon: DollarSign, title: 'Funding Tracker', description: 'Track investors, grants, and runway' },
]

export default function StartupPage() {
  const { data: startups } = useStartups()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30">
            <Rocket className="h-4 w-4" />
            Startup Incubator
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Continue as Startup
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Transform your graduation project into a real startup. InnovateX provides everything you need to launch.
          </p>
        </header>
      </FadeIn>

      {startups && startups.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">Your Startups</h2>
          {startups.map((startup) => (
            <motion.div
              key={startup.id}
              whileHover={{ scale: 1.01 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-soft-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{startup.name}</h3>
                  <p className="mt-1 text-emerald-600">{startup.tagline}</p>
                  <p className="mt-4 max-w-xl text-muted-foreground">{startup.description}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium uppercase text-emerald-700 dark:bg-emerald-950/50">
                  {startup.stage}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <Button>Open Workspace</Button>
                <Button variant="outline">Pitch Deck</Button>
              </div>
            </motion.div>
          ))}
        </section>
      )}

      <section className="mb-16">
        <div className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/30 p-12 text-center dark:border-emerald-800 dark:bg-emerald-950/10">
          <Rocket className="mx-auto h-12 w-12 text-emerald-600" />
          <h3 className="mt-4 text-xl font-semibold">Ready to launch?</h3>
          <p className="mt-2 text-muted-foreground">
            Select a graduated project to spin off into a startup workspace
          </p>
          <Button size="lg" className="mt-6">
            <Plus className="h-4 w-4" />
            Continue as Startup
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Incubator Tools
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {incubatorFeatures.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50">
                <feature.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
