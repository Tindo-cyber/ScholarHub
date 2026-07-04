import { Outlet } from 'react-router-dom'
import { Sidebar, MobileSidebar } from './sidebar'
import { TopBar } from './top-bar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
