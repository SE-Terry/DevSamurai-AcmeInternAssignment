import { Pencil } from 'lucide-react'
import type { CSSProperties } from 'react'

interface OrgMenuProps {
  width: number | undefined
  onRename: () => void
  leftOffset?: number
}

export function OrgMenu({ width, onRename, leftOffset = 0 }: OrgMenuProps) {
  const style: CSSProperties = { width, left: leftOffset }
  return (
    <div
      className="absolute z-10 mt-2 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-md border border-border bg-card shadow-lg box-border"
      style={style}
    >
      <button
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-foreground hover:bg-secondary/60 rounded-md"
        onClick={onRename}
      >
        <Pencil size={14} className="text-muted-foreground" />
        <span>Rename organization</span>
      </button>
    </div>
  )
}

export default OrgMenu


