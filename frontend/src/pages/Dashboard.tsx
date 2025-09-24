import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { authService } from '@/services/authService'
import { User as UserIcon } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import AppHeader from '@/components/AppHeader'
import DateRangeBar from '@/components/DateRangeBar'
import LeadGenerationChart from '@/components/LeadGenerationChart'
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

const companyLogos = {
  microsoft: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  airbnb: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg',
  google: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  dropbox: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg',
  intercom: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Intercom_logo.svg',
}

const contacts = [
  { name: 'Microsoft', logo: companyLogos.microsoft, visits: 1, isCompany: true },
  { name: 'Intercom', logo: companyLogos.intercom, visits: 0, isCompany: true },
  { name: 'Airbnb', logo: companyLogos.airbnb, visits: 0, isCompany: true },
  { name: 'Dropbox', logo: companyLogos.dropbox, visits: 0, isCompany: true },
  { name: 'Marie Jones', visits: 0, isCompany: false },
  { name: 'Vivian Casey', visits: 0, isCompany: false },
]

const leastVisitedContacts = [
  { name: 'Vivian Casey', visits: 0, isCompany: false },
  { name: 'Intercom', logo: companyLogos.intercom, visits: 0, isCompany: true },
  { name: 'Airbnb', logo: companyLogos.airbnb, visits: 0, isCompany: true },
  { name: 'Dropbox', logo: companyLogos.dropbox, visits: 0, isCompany: true },
  { name: 'Marie Jones', visits: 0, isCompany: false },
  { name: 'Lucia Bianchi', visits: 0, isCompany: false },
]

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

        // Make API call to get fresh data and verify token (only once per component mount)
        if (!apiCallMade) {
          try {
            const response = await api.get('/auth/me')
            const userData = response.data.user

            setUserState(userData)
            
            // Cache user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData))
            
            // Update Redux store with fresh user data
            dispatch(setUser({ 
              id: userData.id,
              name: userData.name, 
              email: userData.email 
            }))
            
            setApiCallMade(true) // Mark that we've made the API call
          } catch {
            // Axios interceptor handles 401 errors automatically
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
    <SidebarProvider defaultOpen={true}>
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
            {/* Most Visited Contacts */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Most visited contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {contact.isCompany ? (
                          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-sm"></div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                            <UserIcon size={12} className="text-muted-foreground" />
                          </div>
                        )}
                        <span className="text-sm text-card-foreground">{contact.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{contact.visits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Least Visited Contacts */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Least visited contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leastVisitedContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {contact.isCompany ? (
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-sm"></div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                            <UserIcon size={12} className="text-muted-foreground" />
                          </div>
                        )}
                        <span className="text-sm text-card-foreground">{contact.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{contact.visits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard


