import { Button } from '@/components/ui/button'
import { Home, Users, Settings, User as UserIcon, Heart, GripVertical, Building2, MoreHorizontal, ChevronsDownUp, ChevronsUpDown, Plus, MessageSquare} from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OrgMenu from '@/components/OrgMenu'
import UserMenu from '@/components/UserMenu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import type { RootState } from '@/store/store'
import { setOrganizationName } from '@/store/slices/organizationSlice'
import { setUserDisplayName, setUser } from '@/features/auth/authSlice'
import { toggleFavoriteHeart, reorderFavorites } from '@/store/slices/favoritesSlice'
import { renameOrganizationSchema, renameUserSchema, type RenameOrganizationForm, type RenameUserForm } from '@/schemas/formSchemas'

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  
  // Redux state
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const orgName = useSelector((state: RootState) => state.organization.name)
  const user = useSelector((state: RootState) => state.auth.user)
  
  const dragIndexRef = useRef<number | null>(null)
  // Local component state
  const [menuOpen, setMenuOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const orgBtnRef = useRef<HTMLButtonElement | null>(null)
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined)
  
  // React Hook Form for organization rename
  const orgForm = useForm<RenameOrganizationForm>({
    resolver: zodResolver(renameOrganizationSchema),
    defaultValues: {
      name: orgName
    }
  })

  useLayoutEffect(() => {
    if (menuOpen && orgBtnRef.current) {
      // In collapsed mode, use a fixed width instead of the button width
      const width = isCollapsed ? 200 : orgBtnRef.current.getBoundingClientRect().width
      setMenuWidth(width)
    }
  }, [menuOpen, orgName, isCollapsed])

  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (orgBtnRef.current) {
        const width = isCollapsed ? 200 : orgBtnRef.current.getBoundingClientRect().width
        setMenuWidth(width)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen, isCollapsed])

  // User control (bottom) state
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userBtnRef = useRef<HTMLButtonElement | null>(null)
  const [userMenuWidth, setUserMenuWidth] = useState<number | undefined>(undefined)
  const [userRenameOpen, setUserRenameOpen] = useState(false)

  // React Hook Form for user rename
  const userForm = useForm<RenameUserForm>({
    resolver: zodResolver(renameUserSchema),
    defaultValues: {
      displayName: user?.displayName || ''
    }
  })

  useLayoutEffect(() => {
    if (userMenuOpen && userBtnRef.current) {
      // In collapsed mode, use a fixed width instead of the button width
      const width = isCollapsed ? 200 : userBtnRef.current.getBoundingClientRect().width
      setUserMenuWidth(width)
    }
  }, [userMenuOpen, user?.displayName, isCollapsed])

  useEffect(() => {
    if (!userMenuOpen) return
    const onResize = () => {
      if (userBtnRef.current) {
        const width = isCollapsed ? 200 : userBtnRef.current.getBoundingClientRect().width
        setUserMenuWidth(width)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [userMenuOpen, isCollapsed])

  // Load cached user info from localStorage if Redux state is empty (conservative approach)
  useEffect(() => {
    // Only try to load cached data if we don't have user data in Redux yet
    if (!user?.email) {
      try {
        const cachedUserStr = localStorage.getItem('user')
        if (cachedUserStr) {
          const cached = JSON.parse(cachedUserStr)
          // Only use cached data if it has the essential fields
          if (cached?.email && cached?.name) {
            dispatch(setUser({ 
              id: cached.id,
              name: cached.name, 
              email: cached.email 
            }))
          }
        }
      } catch {
        // Ignore localStorage errors and let Dashboard handle the API call
      }
    }
  }, [dispatch, user?.email])

  // Auto-close menus when sidebar state changes (both collapse and expand)
  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [isCollapsed])

  // Form handlers
  const handleOrgRename = (data: RenameOrganizationForm) => {
    dispatch(setOrganizationName(data.name))
    setRenameOpen(false)
    orgForm.reset({ name: data.name })
  }

  const handleUserRename = (data: RenameUserForm) => {
    dispatch(setUserDisplayName(data.displayName))
    setUserRenameOpen(false)
    userForm.reset({ displayName: data.displayName })
  }

  // Update form default values when Redux state changes
  useEffect(() => {
    orgForm.reset({ name: orgName })
  }, [orgName, orgForm])

  useEffect(() => {
    if (user?.displayName) {
      userForm.reset({ displayName: user.displayName })
    }
  }, [user?.displayName, userForm])

  return (
    <ShadcnSidebar collapsible="icon" className="bg-sidebar border-r border-sidebar-border overflow-hidden">
      <SidebarHeader className="px-4 pt-2 pb-4">
        <div className="relative">
          <button
            ref={orgBtnRef}
            className={`w-full h-12 flex items-center rounded-md px-2 text-foreground hover:bg-secondary/40 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            onClick={() => {
              setMenuOpen((v) => !v)
              if (userMenuOpen) setUserMenuOpen(false)
            }}
          >
            {isCollapsed ? (
              /* Collapsed mode - show only logo */
              <Building2 size={20} className="text-foreground" />
            ) : (
              /* Expanded mode - show logo, name, and chevron */
              <>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Building2 size={20} className="text-foreground flex-shrink-0" />
                  <span className="font-medium truncate">{orgName}</span>
                </div>
                <div className="flex-shrink-0">
                  {menuOpen ? (
                    <ChevronsDownUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronsUpDown size={16} className="text-gray-400" />
                  )}
                </div>
              </>
            )}
          </button>
          {menuOpen && (
            <OrgMenu
              width={menuWidth}
              onRename={() => { 
                orgForm.reset({ name: orgName })
                setRenameOpen(true)
                setMenuOpen(false) 
              }}
              onClose={() => setMenuOpen(false)}
              triggerRef={orgBtnRef}
            />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-2">
              <div className={`w-full flex items-center gap-2 text-foreground bg-secondary/80 hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none rounded-md py-2 px-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`} role="button" tabIndex={0}>
                <Home size={18} />
                {!isCollapsed && <span className="text-sm truncate">Home</span>}
              </div>
              <div className={`w-full flex items-center gap-2 text-muted-foreground hover:text-muted-foreground/80 hover:bg-secondary/40 focus-visible:outline-none rounded-md py-2 px-2 disabled-cursor ${isCollapsed ? 'justify-center' : 'justify-start'}`} role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
                <Users size={18} />
                {!isCollapsed && <span className="text-sm truncate">Contacts</span>}
              </div>
              <div className={`w-full flex items-center gap-2 text-muted-foreground hover:text-muted-foreground/80 hover:bg-secondary/40 focus-visible:outline-none rounded-md py-2 px-2 disabled-cursor ${isCollapsed ? 'justify-center' : 'justify-start'}`} role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
                <Settings size={18} />
                {!isCollapsed && <span className="text-sm truncate">Settings</span>}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Favorites */}
        <SidebarGroup className="mt-4">
          {/* Always maintain fixed space for the label */}
          <div className="mb-4" style={{ height: '24px' }}>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-sm font-medium text-gray-400 transition-opacity duration-200">
                Favorites
              </SidebarGroupLabel>
            )}
          </div>
          <SidebarGroupContent className="overflow-hidden">
            <div className="space-y-2 overflow-hidden">
              {favorites.map((fav, index: number) => (
                <div
                  key={fav.name}
                  className={`group/favorite w-full flex items-center gap-2 text-foreground/70 hover:text-foreground hover:bg-secondary/60 focus-visible:bg-secondary/60 focus-visible:outline-none rounded-md py-2 px-2 transition-all duration-200 ease-in-out ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                  draggable={!isCollapsed}
                  onDragStart={() => { dragIndexRef.current = index }}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => {
                    e.preventDefault()
                    const from = dragIndexRef.current
                    const to = index
                    if (from === null || from === to) return
                    dispatch(reorderFavorites({ from, to }))
                    dragIndexRef.current = null
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {isCollapsed ? (
                    /* Collapsed - show only logo/avatar with fixed positioning */
                    <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                      {fav.logo ? (
                        <img src={fav.logo} alt="DevSamurai" className="w-6 h-6 rounded-sm object-contain" />
                      ) : (
                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                          <UserIcon size={12} className="text-foreground/70" />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Expanded - show full layout */
                    <>
                      <div className="flex items-center gap-2 min-w-0 relative flex-1">
                        <span className="text-muted-foreground hover:text-foreground/80 cursor-grab active:cursor-grabbing select-none opacity-0 group-hover/favorite:opacity-100 transition-opacity">
                          <GripVertical size={14} />
                        </span>
                        <div className="flex-shrink-0">
                          {fav.logo ? (
                            <img src={fav.logo} alt="DevSamurai" className="w-6 h-6 rounded-sm object-contain" />
                          ) : (
                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                              <UserIcon size={12} className="text-foreground/70" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm truncate flex-1 min-w-0">{fav.name}</span>
                      </div>
                      <button
                        className={`shrink-0 p-1 rounded-md hover:text-pink-400 hover:bg-white/5 focus-visible:outline-none transition-opacity ${fav.isHearted ? 'opacity-100 text-pink-500' : 'opacity-0 group-hover/favorite:opacity-100 text-muted-foreground'}`}
                        aria-label={fav.isHearted ? 'Unfavorite' : 'Favorite'}
                        onClick={() => {
                          dispatch(toggleFavoriteHeart(index))
                        }}
                      >
                        <Heart size={14} className={fav.isHearted ? 'fill-pink-500' : ''} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        {/* Decorative items */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Invite member"
              className={`gap-3 text-muted-foreground hover:text-muted-foreground/80 hover:bg-secondary/40 focus-visible:outline-none rounded-md disabled-cursor ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              onClick={(e) => e.preventDefault()}
            >
              <Plus size={18} />
              {!isCollapsed && <span>Invite member</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Feedback"
              className={`gap-3 text-muted-foreground hover:text-muted-foreground/80 hover:bg-secondary/40 focus-visible:outline-none rounded-md disabled-cursor ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              onClick={(e) => e.preventDefault()}
            >
              <MessageSquare size={18} />
              {!isCollapsed && <span>Feedback</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* User control trigger */}
        <div className="relative">
          <button
            ref={userBtnRef}
            className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-foreground hover:bg-secondary/40 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            onClick={() => {
              setUserMenuOpen(v => !v)
              if (menuOpen) setMenuOpen(false)
            }}
          >
            {isCollapsed ? (
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">{user?.initials || 'US'}</div>
            ) : (
              <>
                <span className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">{user?.initials || 'US'}</div>
                  <span className="text-sm font-medium truncate text-foreground">{user?.displayName || 'User'}</span>
                </span>
                <MoreHorizontal size={16} className="text-muted-foreground" />
              </>
            )}
          </button>
          {userMenuOpen && (
            <UserMenu
              width={userMenuWidth}
              leftOffset={0}
              userDisplayName={user?.displayName || 'User'}
              userEmail={user?.email}
              onRename={() => { 
                userForm.reset({ displayName: user?.displayName || 'User' })
                setUserRenameOpen(true)
                setUserMenuOpen(false) 
              }}
              onSignOut={() => { try { localStorage.removeItem('token') } catch { /* ignore */ }; navigate('/auth/sign-in') }}
              onClose={() => setUserMenuOpen(false)}
              triggerRef={userBtnRef}
            />
          )}
        </div>
      </SidebarFooter>

      {/* Rename Organization Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="bg-sidebar border-sidebar-border">
          <DialogHeader>
            <DialogTitle>Rename organization</DialogTitle>
            <DialogDescription>Set a display name for this organization.</DialogDescription>
          </DialogHeader>
          <Form {...orgForm}>
            <form onSubmit={orgForm.handleSubmit(handleOrgRename)} className="space-y-3">
              <FormField
                control={orgForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organization name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setRenameOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* User rename dialog */}
      <Dialog open={userRenameOpen} onOpenChange={setUserRenameOpen}>
        <DialogContent className="bg-sidebar border-sidebar-border">
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>Set a display name for your account on this device.</DialogDescription>
          </DialogHeader>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(handleUserRename)} className="space-y-3">
              <FormField
                control={userForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your display name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setUserRenameOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ShadcnSidebar>
  )
}