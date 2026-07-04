import { Link } from 'react-router-dom'
import { Search, Bell, Sun, Moon, Menu, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useThemeStore, useUIStore } from '@/stores'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { useNotifications } from '@/hooks/use-data'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function TopBar() {
  const { theme, toggleTheme } = useThemeStore()
  const { toggleSidebar } = useUIStore()
  const user = useAuthStore((s) => s.user)
  const { data: notifications } = useNotifications()

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.fullName?.slice(0, 2) ?? '??'

  return (
    <TooltipProvider delayDuration={300}>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            to="/search"
            className={cn('relative hidden transition-all duration-300 sm:block w-64')}
          >
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="flex h-10 w-full items-center rounded-xl border border-border bg-card pl-10 pr-12 text-sm text-muted-foreground">
              Search projects, files...
            </div>
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/search" aria-label="Search"><Button variant="ghost" size="icon" className="sm:hidden"><Search className="h-5 w-5" /></Button></Link>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/notifications" aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>

          <div className="ml-2 hidden items-center gap-3 border-l border-border pl-4 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">{user?.program}</p>
            </div>
            <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{initials}</AvatarFallback></Avatar>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
