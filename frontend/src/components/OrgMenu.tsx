import { Pencil } from 'lucide-react'
import { useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'

interface OrgMenuProps {
  width: number | undefined
  onRename: () => void
  leftOffset?: number
  onClose?: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export function OrgMenu({ width, onRename, leftOffset = 0, onClose, triggerRef }: OrgMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const style: CSSProperties = { width, left: leftOffset }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
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
      className="absolute z-10 mt-2 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-md border border-sidebar-border bg-sidebar shadow-lg box-border"
      style={style}
    >
      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
        onClick={onRename}
        data-testid="rename-org-btn"
      >
        <Pencil size={14} className="text-sidebar-foreground/70" />
        <span>Rename organization</span>
      </button>
    </div>
  )
}

export default OrgMenu


