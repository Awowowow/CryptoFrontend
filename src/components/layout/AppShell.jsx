import {
  BadgeCheck,
  ChevronDown,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserRound,
  Wallet,
} from 'lucide-react'
import { useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/auth/authSlice'
import Alert from '../ui/Alert'
import BrandLogo from '../ui/BrandLogo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const privateNavItems = [
  { icon: LayoutDashboard, label: 'Exchange', to: '/exchange' },
  { icon: Wallet, label: 'Wallets', to: '/wallets' },
  { icon: ClipboardCheck, label: 'Verification', to: '/kyc' },
  { icon: ShieldCheck, label: 'Security', to: '/security' },
]

const publicNavItems = [
  { label: 'Sign in', to: '/auth/login' },
  { label: 'Create account', to: '/auth/signup', featured: true },
]

const AppShell = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/auth/') || location.pathname === '/verify-email'
  const navItems =
    user?.role === 'ADMIN'
      ? [...privateNavItems, { icon: BadgeCheck, label: 'Admin KYC', to: '/admin/kyc' }]
      : privateNavItems

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <BrandLogo size="lg" to={user ? '/exchange' : '/'} />

          {user && (
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-slate-950'
                    }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!user &&
              publicNavItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    item.featured
                      ? `inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-white ${
                          isActive ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`
                      : `inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold ${
                          isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-700 hover:bg-slate-100'
                        }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}

            {user && <AccountMenu onLogout={() => dispatch(logoutUser())} user={user} />}
          </div>
        </div>

        {user && (
          <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                    isActive ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 shadow-sm'
                  }`
                }
                key={item.to}
                to={item.to}
              >
                <item.icon size={15} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <div
        className={`mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 ${
          isAuthPage ? 'justify-center' : ''
        }`}
      >
        <div className="space-y-5">
          <Alert />
          <Outlet />
        </div>
      </div>
    </main>
  )
}

const AccountMenu = ({ user, onLogout }) => {
  const initials = useMemo(() => user.email?.slice(0, 1).toUpperCase() ?? 'U', [user.email])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-11 gap-2 rounded-full px-2 pr-3" variant="outline">
          <Avatar className="size-8">
            <AvatarFallback className="bg-slate-950 text-white">{initials}</AvatarFallback>
          </Avatar>
          <ChevronDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <span className="block truncate text-sm font-semibold">{user.email}</span>
          <span className="mt-1 block text-xs font-medium text-slate-500">{user.role}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="/profile">
            <UserRound />
            Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/security">
            <ShieldCheck />
            Security
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={onLogout}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppShell
