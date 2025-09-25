import { Pencil, Moon, Sun, LogOut, PaintBucket } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { RootState } from '@/store/store'
import { setTheme } from '@/store/slices/themeSlice'

interface UserMenuProps {
  width: number | undefined
  leftOffset?: number
  userDisplayName: string
  userEmail?: string
  onRename: () => void
  onSignOut: () => void
  onClose?: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export function UserMenu({ width, leftOffset = 0, onRename, onSignOut, userDisplayName, userEmail, onClose, triggerRef }: UserMenuProps) {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)
  const menuRef = useRef<HTMLDivElement>(null)
  const style: CSSProperties = { width, left: leftOffset }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        // Don't close if clicking on the trigger button
        if (triggerRef?.current && triggerRef.current.contains(target)) {
          return
        }
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, triggerRef])
  return (
    <div
      ref={menuRef}
      className="absolute z-10 bottom-full mb-2 rounded-md border border-sidebar-border bg-sidebar shadow-lg box-border"
      style={style}
    >
      {(userDisplayName || userEmail) && (
        <div className="px-2 py-2 border-b border-sidebar-border">
          {userDisplayName && <div className="text-sm text-sidebar-foreground font-medium truncate">{userDisplayName}</div>}
          {userEmail && <div className="text-xs text-sidebar-foreground/70 truncate">{userEmail}</div>}
        </div>
      )}
      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
        onClick={onRename}
        data-testid="rename-user-btn"
      >
        <Pencil size={14} className="text-sidebar-foreground/70" />
        <span>Rename</span>
      </button>

      <div className="px-2 py-1.5 flex items-center justify-between gap-3">
        <div className="text-sm text-sidebar-foreground flex items-center gap-2">
          <PaintBucket size={14} className="text-sidebar-foreground/70" />
          <span>Theme</span>
        </div>
        <div className="flex items-center gap-2 bg-sidebar-accent rounded-full p-1 border border-sidebar-border">
          <button
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${theme === 'light' ? 'bg-sidebar-accent text-yellow-500' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}
            onClick={() => dispatch(setTheme('light'))}
            aria-label="Light"
            data-testid="light-theme-btn"
          >
            <Sun size={16} />
          </button>
          <button
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${theme === 'dark' ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}
            onClick={() => dispatch(setTheme('dark'))}
            aria-label="Dark"
            data-testid="dark-theme-btn"
          >
            <Moon size={16} />
          </button>
        </div>
      </div>

      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-500 hover:bg-sidebar-accent rounded-md"
        onClick={onSignOut}
        data-testid="signout-btn"
      >
        <LogOut size={14} />
        <span>Sign out</span>
      </button>
    </div>
  )
}

export default UserMenu


