import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Sparkles,
  Bell,
  Settings,
  GraduationCap,
  X,
  Store,
  Rocket,
  UserCheck,
  Search,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { to: '/', label: 'Workspace', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/ai', label: 'AI Mentor', icon: Sparkles },
  { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { to: '/marketplace', label: 'Marketplace', icon: Store },
  { to: '/startup', label: 'Startup', icon: Rocket },
  { to: '/supervisor', label: 'Supervisor', icon: UserCheck, roles: ['SUPERVISOR', 'ADMINISTRATOR'] as const },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function NavItem({ to, label, icon: Icon }: (typeof navItems)[0]) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        )
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const user = useAuthStore((s) => s.user)

  const visibleItems = navItems.filter((item) => {
    if (!item.roles) return true
    return user && item.roles.includes(user.role as typeof item.roles[number])
  })

  return (
    <>
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-soft">
          <GraduationCap className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">ScholarHub</p>
          <p className="text-[10px] text-muted-foreground">Build · Innovate · Launch</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-0.5" aria-label="Main navigation">
        {visibleItems.map((item) => (
          <div key={item.to} onClick={onNavigate}>
            <NavItem {...item} />
          </div>
        ))}
      </nav>
    </>
  )
}

export function Sidebar() {
  const location = useLocation()
  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-border lg:bg-card lg:px-4 lg:py-6" aria-label="Sidebar">
      <SidebarContent key={location.pathname} />
    </aside>
  )
}

export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)} aria-hidden="true"
          />
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card px-4 py-6 lg:hidden"
            aria-label="Mobile sidebar"
          >
            <div className="mb-4 flex justify-end">
              <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
