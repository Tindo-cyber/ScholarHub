import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppLayout } from '@/components/layout/app-layout'
import { ProtectedRoute, GuestRoute } from '@/features/auth/components/protected-route'

const HomePage = lazy(() => import('@/pages/home-page'))
const ProjectsPage = lazy(() => import('@/pages/projects-page'))
const ProjectDetailsPage = lazy(() => import('@/pages/project-details-page'))
const PortfolioPage = lazy(() => import('@/pages/portfolio-page'))
const AIWorkspacePage = lazy(() => import('@/pages/ai-workspace-page'))
const NotificationsPage = lazy(() => import('@/pages/notifications-page'))
const SettingsPage = lazy(() => import('@/pages/settings-page'))
const LoginPage = lazy(() => import('@/features/auth/pages/login-page'))
const RegisterPage = lazy(() => import('@/features/auth/pages/register-page'))
const MarketplacePage = lazy(() => import('@/features/marketplace/pages/marketplace-page'))
const StartupPage = lazy(() => import('@/features/startup/pages/startup-page'))
const SupervisorPage = lazy(() => import('@/features/supervisor/pages/supervisor-page'))
const SearchPage = lazy(() => import('@/features/search/pages/search-page'))
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/analytics-page'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
    </div>
  )
}

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/auth/login" element={<Lazy><LoginPage /></Lazy>} />
              <Route path="/auth/register" element={<Lazy><RegisterPage /></Lazy>} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Lazy><HomePage /></Lazy>} />
                <Route path="projects" element={<Lazy><ProjectsPage /></Lazy>} />
                <Route path="projects/:id" element={<Lazy><ProjectDetailsPage /></Lazy>} />
                <Route path="portfolio" element={<Lazy><PortfolioPage /></Lazy>} />
                <Route path="ai" element={<Lazy><AIWorkspacePage /></Lazy>} />
                <Route path="marketplace" element={<Lazy><MarketplacePage /></Lazy>} />
                <Route path="startup" element={<Lazy><StartupPage /></Lazy>} />
                <Route path="supervisor" element={<Lazy><SupervisorPage /></Lazy>} />
                <Route path="search" element={<Lazy><SearchPage /></Lazy>} />
                <Route path="analytics" element={<Lazy><AnalyticsPage /></Lazy>} />
                <Route path="notifications" element={<Lazy><NotificationsPage /></Lazy>} />
                <Route path="settings" element={<Lazy><SettingsPage /></Lazy>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
