import { Pencil, Moon, Sun, LogOut, PaintBucket } from 'lucide-react'
import type { CSSProperties } from 'react'

interface UserMenuProps {
  width: number | undefined
  leftOffset?: number
  theme: 'dark' | 'light'
  onSetTheme: (theme: 'dark' | 'light') => void
  userDisplayName: string
  userEmail?: string
  onRename: () => void
  onSignOut: () => void
}

export function UserMenu({ width, leftOffset = 0, theme, onSetTheme, onRename, onSignOut, userDisplayName, userEmail }: UserMenuProps) {
  const style: CSSProperties = { width, left: leftOffset }
  return (
    <div
      className="absolute z-10 bottom-full mb-2 rounded-md border border-border bg-card shadow-lg box-border"
      style={style}
    >
      {(userDisplayName || userEmail) && (
        <div className="px-2 py-2 border-b border-border">
          {userDisplayName && <div className="text-sm text-foreground font-medium truncate">{userDisplayName}</div>}
          {userEmail && <div className="text-xs text-muted-foreground truncate">{userEmail}</div>}
        </div>
      )}
      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-foreground hover:bg-secondary/60 rounded-md"
        onClick={onRename}
      >
        <Pencil size={14} className="text-muted-foreground" />
        <span>Rename</span>
      </button>

      <div className="px-2 py-1.5 flex items-center justify-between gap-3">
        <div className="text-sm text-foreground flex items-center gap-2">
          <PaintBucket size={14} className="text-muted-foreground" />
          <span>Theme</span>
        </div>
        <div className="flex items-center gap-2 bg-secondary/40 rounded-full p-1 border border-border">
          <button
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${theme === 'light' ? 'bg-secondary text-yellow-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onSetTheme('light')}
            aria-label="Light"
          >
            <Sun size={16} />
          </button>
          <button
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${theme === 'dark' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => onSetTheme('dark')}
            aria-label="Dark"
          >
            <Moon size={16} />
          </button>
        </div>
      </div>

      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-500 hover:bg-secondary/60 rounded-md"
        onClick={onSignOut}
      >
        <LogOut size={14} />
        <span>Sign out</span>
      </button>
    </div>
  )
}

export default UserMenu


