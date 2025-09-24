import { Github, X, HelpCircle, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppHeaderProps {
  onLogout?: () => void
  onToggleSidebar?: () => void
  isSidebarCollapsed?: boolean
}

export default function AppHeader({ onLogout, onToggleSidebar, isSidebarCollapsed }: AppHeaderProps) {
  return (
    <header className="border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
            <h1 className="text-lg font-medium">Overview</h1>
            <HelpCircle size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Github size={18} className="text-gray-400" />
          <X size={18} className="text-gray-400" />
          {onLogout && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={onLogout}>
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}


