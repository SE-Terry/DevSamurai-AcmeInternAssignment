import { Button } from '@/components/ui/button'
import { Home, Users, Settings, User as UserIcon, Heart, GripVertical, Building2, MoreHorizontal, ChevronsDownUp, ChevronsUpDown} from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrgMenu from '@/components/OrgMenu'
import UserMenu from '@/components/UserMenu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface SidebarProps {
  userName: string
}

export default function Sidebar({ userName }: SidebarProps) {
  const initials = userName ? userName.slice(0, 2).toUpperCase() : 'US'
  const navigate = useNavigate()
  interface FavoriteItem { name: string; logo: string | null; isHearted: boolean }
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const raw = localStorage.getItem('sidebar:favorites')
      if (raw) return JSON.parse(raw) as FavoriteItem[]
    } catch {}
    return [
      { name: 'Tham Tran', logo: '/DevSamuraiLogo.png', isHearted: false },
      { name: 'Thuc Tran', logo: '/DevSamuraiLogo.png', isHearted: false },
      { name: 'Minh Dang', logo: '/DevSamuraiLogo.png', isHearted: false },
      { name: 'DevSamurai', logo: '/DevSamuraiLogo.png', isHearted: false },
      { name: 'Terry', logo: null, isHearted: false },
    ]
  })
  const dragIndexRef = useRef<number | null>(null)
  const [orgName, setOrgName] = useState<string>(() => {
    try {
      return localStorage.getItem('sidebar:orgName') || 'Organization'
    } catch {
      return 'Organization'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameValue, setRenameValue] = useState(orgName)
  const orgBtnRef = useRef<HTMLButtonElement | null>(null)
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    if (menuOpen && orgBtnRef.current) {
      setMenuWidth(orgBtnRef.current.getBoundingClientRect().width)
    }
  }, [menuOpen, orgName])

  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (orgBtnRef.current) {
        setMenuWidth(orgBtnRef.current.getBoundingClientRect().width)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  // User control (bottom) state
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userBtnRef = useRef<HTMLButtonElement | null>(null)
  const [userMenuWidth, setUserMenuWidth] = useState<number | undefined>(undefined)
  const [userDisplayName, setUserDisplayName] = useState<string>(() => {
    try { return localStorage.getItem('sidebar:userName') || userName } catch { return userName }
  })
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
  const [userRenameOpen, setUserRenameOpen] = useState(false)
  const [userRenameValue, setUserRenameValue] = useState(userDisplayName)
  const [theme, setTheme] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    } catch {
      return 'dark'
    }
  })

  useLayoutEffect(() => {
    if (userMenuOpen && userBtnRef.current) {
      setUserMenuWidth(userBtnRef.current.getBoundingClientRect().width)
    }
  }, [userMenuOpen, userDisplayName])

  useEffect(() => {
    if (!userMenuOpen) return
    const onResize = () => {
      if (userBtnRef.current) setUserMenuWidth(userBtnRef.current.getBoundingClientRect().width)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [userMenuOpen])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  // Attempt to fetch user email from backend token (if available)
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        // Prefer cached user info from authService storage first for speed
        const cachedUserStr = localStorage.getItem('user')
        if (cachedUserStr) {
          const cached = JSON.parse(cachedUserStr)
          if (cached?.email) setUserEmail(cached.email)
        }

        const token = localStorage.getItem('access_token') || localStorage.getItem('token')
        if (!token) return
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!res.ok) return
        const data = await res.json()
        if (data?.user?.email) setUserEmail(data.user.email)
      } catch {}
    }
    fetchEmail()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('sidebar:favorites', JSON.stringify(favorites))
    } catch {}
  }, [favorites])

  // Ensure 'DevSamurai' exists in favorites for older local data
  return (
    <div className="w-full h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* User Profile */}
      <div className="p-4 relative">
        <button
          ref={orgBtnRef}
          className="w-full flex items-center justify-between gap-2 rounded-md bg-secondary/40 px-2 py-2 text-foreground hover:bg-secondary/60 sidebar-expanded:flex sidebar-collapsed:justify-center whitespace-nowrap items-center"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="sidebar-collapsed:hidden flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <Building2 size={16} className="text-gray-200" />
            </div>
            <span className="font-medium truncate">{orgName}</span>
          </div>
          {menuOpen ? (
            <ChevronsDownUp size={16} className="text-gray-400" />
          ) : (
            <ChevronsUpDown size={16} className="text-gray-400" />
          )}
        </button>
        {menuOpen && (
          <OrgMenu
            width={menuWidth}
            leftOffset={16}
            onRename={() => { setRenameValue(orgName); setRenameOpen(true); setMenuOpen(false) }}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/70 hover:text-foreground hover:bg-secondary/60 focus-visible:bg-secondary/60 focus-visible:outline-none rounded-md sidebar-collapsed:justify-center">
            <Home size={18} />
            <span className="sidebar-collapsed:hidden">Home</span>
          </Button>
          <Button
            variant="ghost"
            disabled
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-secondary/40 cursor-not-allowed focus-visible:bg-secondary/40 focus-visible:outline-none rounded-md sidebar-collapsed:justify-center"
          >
            <Users size={18} />
            <span className="sidebar-collapsed:hidden">Contacts</span>
          </Button>
          <Button
            variant="ghost"
            disabled
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-secondary/40 cursor-not-allowed focus-visible:bg-secondary/40 focus-visible:outline-none rounded-md sidebar-collapsed:justify-center"
          >
            <Settings size={18} />
            <span className="sidebar-collapsed:hidden">Settings</span>
          </Button>
        </div>

        {/* Favorites */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-400 mb-3 sidebar-collapsed:hidden">Favorites</h3>
        <div className="space-y-2">
          {favorites.map((fav: FavoriteItem, index: number) => (
            <div
              key={fav.name}
              className="group w-full flex items-center justify-between gap-2 text-foreground/70 hover:text-foreground hover:bg-secondary/60 focus-visible:bg-secondary/60 focus-visible:outline-none rounded-md py-2 sidebar-collapsed:justify-center pl-2"
              draggable
              onDragStart={() => { dragIndexRef.current = index }}
              onDragOver={(e) => { e.preventDefault() }}
              onDrop={(e) => {
                e.preventDefault()
                const from = dragIndexRef.current
                const to = index
                if (from === null || from === to) return
                setFavorites((prev: FavoriteItem[]) => {
                  const next = [...prev]
                  const [moved] = next.splice(from, 1)
                  next.splice(to, 0, moved)
                  return next
                })
                dragIndexRef.current = null
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-muted-foreground hover:text-foreground/80 cursor-grab active:cursor-grabbing select-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={14} />
                </span>
                {fav.logo ? (
                  <img src={fav.logo} alt="DevSamurai" className="w-6 h-6 rounded-sm object-contain" />
                ) : (
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <UserIcon size={12} className="text-foreground/70" />
                  </div>
                )}
                <span className="text-sm truncate sidebar-collapsed:hidden">{fav.name}</span>
              </div>
              <button
                className={`sidebar-collapsed:hidden shrink-0 p-1 rounded-md hover:text-pink-400 hover:bg-white/5 focus-visible:outline-none transition-opacity ${fav.isHearted ? 'opacity-100 text-pink-500' : 'opacity-0 group-hover:opacity-100 text-muted-foreground'}`}
                aria-label={fav.isHearted ? 'Unfavorite' : 'Favorite'}
                onClick={() => {
                  setFavorites((prev: FavoriteItem[]) => prev.map((f: FavoriteItem, i: number) => i === index ? { ...f, isHearted: !f.isHearted } : f))
                }}
              >
                <Heart size={14} className={fav.isHearted ? 'fill-pink-500' : ''} />
              </button>
            </div>
          ))}
        </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-2">
        {/* User control trigger */}
        <div className="relative">
          <button
            ref={userBtnRef}
            className="w-full flex items-center justify-between gap-2 rounded-md bg-secondary/40 px-2 py-2 text-foreground hover:bg-secondary/60 sidebar-collapsed:justify-center"
            onClick={() => setUserMenuOpen(v => !v)}
          >
            <span className="flex items-center gap-3">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">{initials}</div>
              <span className="text-sm font-medium truncate text-foreground sidebar-collapsed:hidden">{userDisplayName}</span>
            </span>
            <MoreHorizontal size={16} className="text-muted-foreground sidebar-collapsed:hidden" />
          </button>
          {userMenuOpen && (
            <UserMenu
              width={userMenuWidth}
              leftOffset={0}
              theme={theme as 'dark' | 'light'}
              onSetTheme={(t) => setTheme(t)}
              userDisplayName={userDisplayName}
              userEmail={userEmail}
              onRename={() => { setUserRenameValue(userDisplayName); setUserRenameOpen(true); setUserMenuOpen(false) }}
              onSignOut={() => { try { localStorage.removeItem('token') } catch {}; navigate('/auth/sign-in') }}
            />
          )}
        </div>
      </div>
      {/* Rename Organization Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="bg-gray-950 border-gray-800">
          <DialogHeader>
            <DialogTitle>Rename organization</DialogTitle>
            <DialogDescription>Set a display name for this organization.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const value = renameValue.trim() || 'Organization'
              setOrgName(value)
              try { localStorage.setItem('sidebar:orgName', value) } catch {}
              setRenameOpen(false)
            }}
            className="space-y-3"
          >
            <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} placeholder="Organization name" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setRenameOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* User rename dialog */}
      <Dialog open={userRenameOpen} onOpenChange={setUserRenameOpen}>
        <DialogContent className="bg-gray-950 border-gray-800">
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>Set a display name for your account on this device.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const value = userRenameValue.trim() || userName
              setUserDisplayName(value)
              try { localStorage.setItem('sidebar:userName', value) } catch {}
              setUserRenameOpen(false)
            }}
            className="space-y-3"
          >
            <Input value={userRenameValue} onChange={(e) => setUserRenameValue(e.target.value)} placeholder="Your display name" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setUserRenameOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}