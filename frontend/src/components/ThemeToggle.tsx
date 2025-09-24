"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '@/store/slices/themeSlice'
import type { RootState } from '@/store/store'

export function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggleTheme} className="h-9 w-9">
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle


