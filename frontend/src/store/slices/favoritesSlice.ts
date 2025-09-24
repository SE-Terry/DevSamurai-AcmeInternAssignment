import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteItem {
  name: string
  logo: string | null
  isHearted: boolean
}

interface FavoritesState {
  items: FavoriteItem[]
}

const getInitialFavorites = (): FavoriteItem[] => {
  try {
    const raw = localStorage.getItem('sidebar:favorites')
    if (raw) return JSON.parse(raw) as FavoriteItem[]
  } catch {
    // Ignore localStorage errors
  }
  return [
    { name: 'Tham Tran', logo: '/DevSamuraiLogo.png', isHearted: false },
    { name: 'Thuc Tran', logo: '/DevSamuraiLogo.png', isHearted: false },
    { name: 'Minh Dang', logo: '/DevSamuraiLogo.png', isHearted: false },
    { name: 'DevSamurai', logo: '/DevSamuraiLogo.png', isHearted: false },
    { name: 'Terry', logo: null, isHearted: false },
  ]
}

const initialState: FavoritesState = {
  items: getInitialFavorites()
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteHeart: (state, action: PayloadAction<number>) => {
      const index = action.payload
      if (index >= 0 && index < state.items.length) {
        state.items[index].isHearted = !state.items[index].isHearted
        try {
          localStorage.setItem('sidebar:favorites', JSON.stringify(state.items))
        } catch {
          // Ignore localStorage errors
        }
      }
    },
    reorderFavorites: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload
      if (from >= 0 && from < state.items.length && to >= 0 && to < state.items.length && from !== to) {
        const [moved] = state.items.splice(from, 1)
        state.items.splice(to, 0, moved)
        try {
          localStorage.setItem('sidebar:favorites', JSON.stringify(state.items))
        } catch {
          // Ignore localStorage errors
        }
      }
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload
      try {
        localStorage.setItem('sidebar:favorites', JSON.stringify(action.payload))
      } catch {
        // Ignore localStorage errors
      }
    }
  }
})

export const { toggleFavoriteHeart, reorderFavorites, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
