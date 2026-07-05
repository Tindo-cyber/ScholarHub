import { User, Bell, Shield, Palette, Globe, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { FadeIn } from '@/components/ui/motion'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { useThemeStore } from '@/stores'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const settingsSections = [
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Supervisor feedback', description: 'Get notified when supervisors comment', default: true },
      { label: 'Deployment updates', description: 'Build and deployment status changes', default: true },
      { label: 'AI insights', description: 'When InnovateX AI completes an analysis', default: true },
      { label: 'Deadline reminders', description: 'Upcoming submission deadlines', default: true },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    items: [
      { label: 'Public portfolio', description: 'Allow others to view your portfolio', default: false },
      { label: 'Two-factor authentication', description: 'Add an extra layer of security', default: false },
    ],
  },
]

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { theme, setTheme } = useThemeStore()

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : '??'

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user?.fullName}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {user?.program} · {user?.university}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
          </div>
        </section>
      </FadeIn>

      {settingsSections.map((section, si) => (
        <FadeIn key={section.title} delay={0.2 + si * 0.05}>
          <section className="mb-10 rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-5">
              {section.items.map((item, i) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.default} aria-label={item.label} />
                  </div>
                  {i < section.items.length - 1 && <Separator className="mt-5" />}
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      ))}

      <FadeIn delay={0.35}>
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Language & Region</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="text-sm text-muted-foreground">English (US)</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </section>
      </FadeIn>

      <div className="mt-12 flex justify-center">
        <Button variant="ghost" onClick={logout} className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
