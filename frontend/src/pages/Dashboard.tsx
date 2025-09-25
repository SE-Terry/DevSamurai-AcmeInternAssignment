import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { authService } from '@/services/authService'
import Sidebar from '@/components/Sidebar'
import AppHeader from '@/components/AppHeader'
import DateRangeBar from '@/components/DateRangeBar'
import LeadGenerationChart from '@/components/LeadGenerationChart'
import MostVisitedContacts from '@/components/MostVisitedContacts'
import LeastVisitedContacts from '@/components/LeastVisitedContacts'
import { setUser } from '@/features/auth/authSlice'
import { setActiveTab } from '@/store/slices/dateRangeSlice'
import { useChartDataPrefetch } from '@/hooks/useChartData'
import api from '@/lib/axios'

interface AuthUser {
  id: number
  name: string
  email: string
  createdat: string
  updatedat: string
}

export function Dashboard() {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiCallMade, setApiCallMade] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Initialize date range on component mount
  useEffect(() => {
    dispatch(setActiveTab('1d'))
  }, [dispatch])

  // Prefetch other date ranges in the background for better UX
  useChartDataPrefetch()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = authService.getToken()
        if (!token) {
          navigate('/auth/sign-in')
          return
        }

        const cachedUserStr = localStorage.getItem('user')
        if (cachedUserStr) {
          try {
            const cachedUser = JSON.parse(cachedUserStr)
            if (cachedUser?.id && cachedUser?.email) {
              setUserState(cachedUser)
              dispatch(setUser({ 
                id: cachedUser.id,
                name: cachedUser.name, 
                email: cachedUser.email 
              }))
              setLoading(false) 
            }
          } catch {
            // Invalid cached data, ignore
          }
        }

        // Make API call to get fresh data and verify token
        if (!apiCallMade) {
          try {
            const response = await api.get('/auth/me')
            const userData = response.data.user

            setUserState(userData)
            
            // Cache user data
            localStorage.setItem('user', JSON.stringify(userData))
            
            // Update Redux store
            dispatch(setUser({ 
              id: userData.id,
              name: userData.name, 
              email: userData.email 
            }))
            
            setApiCallMade(true)
          } catch {
            // Axios interceptor handles 401 errors
            // For other errors, clear cache and redirect
            localStorage.removeItem('user')
            authService.removeToken()
            navigate('/auth/sign-in')
          }
        }
      } catch {
        authService.removeToken()
        navigate('/auth/sign-in')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate, dispatch, apiCallMade])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground/60 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <SidebarProvider defaultOpen={true} data-testid="dashboard-page">
      <Sidebar />
      <SidebarInset>
        <AppHeader />
        
        {/* Content */}
        <main className="flex-1 overflow-auto bg-background text-foreground">
          {/* Date Range Bar */}
          <DateRangeBar />
          
          {/* Main Content */}
          <div className="p-6">

          {/* Lead Generation Chart */}
          <div className="mb-8">
            <LeadGenerationChart />
          </div>

          {/* Contact Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MostVisitedContacts />
            <LeastVisitedContacts />
          </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard