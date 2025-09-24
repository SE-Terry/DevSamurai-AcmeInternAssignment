import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import themeReducer from '@/store/slices/themeSlice'
import organizationReducer from '@/store/slices/organizationSlice'
import favoritesReducer from '@/store/slices/favoritesSlice'
import dateRangeReducer from '@/store/slices/dateRangeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    organization: organizationReducer,
    favorites: favoritesReducer,
    dateRange: dateRangeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dateRange/setDateRange'],
        ignoredPaths: ['dateRange.dateRange'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


