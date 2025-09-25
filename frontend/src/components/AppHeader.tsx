import { Github, Linkedin, Facebook, UserStar, Info, ChevronDown, PanelLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useSidebar } from '@/components/ui/sidebar'

export default function AppHeader() {
  const [githubDropdownOpen, setGithubDropdownOpen] = useState(false)
  const githubDropdownRef = useRef<HTMLDivElement>(null)
  const { state, toggleSidebar } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (githubDropdownRef.current && !githubDropdownRef.current.contains(event.target as Node)) {
        setGithubDropdownOpen(false)
      }
    }

    if (githubDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [githubDropdownOpen])
  return (
    <header className="border-b border-sidebar-border p-4 bg-sidebar">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors group"
              data-testid="sidebar-toggle-btn"
            >
              <PanelLeft size={18} className="group-hover:hidden" />
              {isSidebarCollapsed ? (
                <PanelLeftOpen size={18} className="hidden group-hover:block" />
              ) : (
                <PanelLeftClose size={18} className="hidden group-hover:block" />
              )}
            </button>
            <div className="w-px h-4 bg-sidebar-foreground/20"></div>
            <h1 className="text-md font-medium text-sidebar-foreground">Overview</h1>
            <div className="relative group">
              <Info size={16} className="text-sidebar-foreground/70" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-sidebar text-sidebar-foreground text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 border border-sidebar-border shadow-md">
                Lead and contact engagement metrics
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-sidebar"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/dev-terry/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors icon-inherit"
            data-testid="linkedin-link"
          >
            <Linkedin size={18} />
          </a>
          <div className="relative" ref={githubDropdownRef}>
            <button
              onClick={() => setGithubDropdownOpen(!githubDropdownOpen)}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors icon-inherit flex items-center gap-1"
              data-testid="github-dropdown-btn"
            >
              <Github size={18} />
              <ChevronDown size={12} />
            </button>
            {githubDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-md shadow-lg py-1 z-50 min-w-[140px]">
                <a
                  href="https://github.com/SE-Terry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={() => setGithubDropdownOpen(false)}
                >
                  SE-Terry
                </a>
                <a
                  href="https://github.com/Terry-UIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={() => setGithubDropdownOpen(false)}
                >
                  Terry-UIT
                </a>
              </div>
            )}
          </div>
          <a
            href="https://www.facebook.com/publ.terry/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors icon-inherit"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://seterry.id.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors icon-inherit"
          >
            <UserStar size={18} />
          </a>
        </div>
      </div>
    </header>
  )
}


