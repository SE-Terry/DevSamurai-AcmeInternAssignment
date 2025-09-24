import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authService } from '@/services/authService'
import { User as UserIcon, Calendar } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import AppHeader from '@/components/AppHeader'

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

function useLeadSummary() {
  return useQuery({
    queryKey: ['leadSummary'],
    queryFn: async () => {
      // Placeholder for future backend integration
      // const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      // const res = await fetch(`${apiUrl}/leads/summary`)
      // if (!res.ok) throw new Error('Failed to fetch lead summary')
      // return res.json()
      return { people: 0, companies: 0 }
    },
  })
}

export function Dashboard() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const { data: leadSummary } = useLeadSummary()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = authService.getToken()
        if (!token) {
          navigate('/auth/sign-in')
          return
        }

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const response = await fetch(`${apiUrl}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            authService.removeToken()
            navigate('/auth/sign-in')
            return
          }
          throw new Error('Failed to fetch user profile')
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        authService.removeToken()
        navigate('/auth/sign-in')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = () => {
    authService.removeToken()
    navigate('/auth/sign-in')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60 mx-auto"></div>
          <p className="mt-4 text-white/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className={`flex h-screen bg-black text-white ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <div className={sidebarCollapsed ? 'w-[72px] transition-all' : 'w-64 transition-all'}>
        <Sidebar userName={user.name} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AppHeader onLogout={handleLogout} onToggleSidebar={() => setSidebarCollapsed(v => !v)} isSidebarCollapsed={sidebarCollapsed} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Date Range Selector */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex bg-gray-900 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="bg-gray-800 text-white">
                1d
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                3d
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                7d
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                30d
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                Custom
              </Button>
            </div>
            <div className="flex items-center gap-2 bg-gray-900 px-3 py-2 rounded-lg">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm">Sep 23, 2025 - Sep 24, 2025</span>
            </div>
          </div>

          {/* Lead Generation Card */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Lead generation</CardTitle>
              <p className="text-gray-400 text-sm">New contacts added to the pool.</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{leadSummary?.people ?? 0}</div>
                  <div className="text-sm text-gray-400">People</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{leadSummary?.companies ?? 0}</div>
                  <div className="text-sm text-gray-400">Companies</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Most Visited Contacts */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Most visited contacts</CardTitle>
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
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <UserIcon size={12} className="text-gray-300" />
                          </div>
                        )}
                        <span className="text-sm text-white">{contact.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{contact.visits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Least Visited Contacts */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Least visited contacts</CardTitle>
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
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <UserIcon size={12} className="text-gray-300" />
                          </div>
                        )}
                        <span className="text-sm text-white">{contact.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{contact.visits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

