import {
  ArrowRightLeft,
  BarChart3,
  ChevronDown,
  CreditCard,
  LogOut,
  ShieldCheck,
  UserCircle,
  Wallet,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/auth/authSlice'
import Alert from '../ui/Alert'
import BrandLogo from '../ui/BrandLogo'

const appNav = [
  { icon: CreditCard, label: 'Buy Crypto', planned: true },
  { icon: BarChart3, label: 'Markets', planned: true },
  { icon: ArrowRightLeft, label: 'Trade', planned: true },
  { icon: Wallet, label: 'Wallet', planned: true },
]

const authNav = [
  { label: 'Sign in', to: '/auth/login' },
  { label: 'Create account', to: '/auth/signup', featured: true },
]

const AppShell = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const visibleNav = user ? appNav : []
  const isLandingPage = location.pathname === '/'
  const isAuthPage = location.pathname.startsWith('/auth/')

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/85 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <BrandLogo className="hover:bg-slate-100/70" size="md" to={user ? '/security' : '/'} />

          {visibleNav.length > 0 && (
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 lg:flex">
              {visibleNav.map((item) =>
                item.planned ? (
                  <button
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-slate-400"
                    key={item.label}
                    title="Coming soon"
                    type="button"
                  >
                    <item.icon size={16} />
                    {item.label}
                    <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] uppercase text-slate-500 shadow-sm">
                      Soon
                    </span>
                  </button>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`
                    }
                    key={item.to}
                    to={item.to}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!user &&
              authNav.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    item.featured
                      ? `rounded-xl px-4 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/20 ${
                          isActive ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`
                      : `rounded-xl px-4 py-2.5 text-sm font-semibold ${
                          isActive
                            ? 'bg-slate-100 text-slate-950'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}

            {user && (
              <AccountMenu
                isSecurityActive={location.pathname === '/security'}
                user={user}
                onLogout={() => dispatch(logoutUser())}
              />
            )}
          </div>
        </div>

        {visibleNav.length > 0 && (
          <div className="px-1 pb-3 pt-2 lg:hidden">
            <nav className="flex gap-2 overflow-x-auto">
              {visibleNav.map((item) =>
                item.planned ? (
                  <span
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-sm font-semibold text-slate-400 shadow-sm"
                    key={item.label}
                  >
                    <item.icon size={15} />
                    {item.label} soon
                  </span>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                        isActive ? 'bg-slate-950 text-white' : 'bg-white/75 text-slate-700 shadow-sm'
                      }`
                    }
                    key={item.to}
                    to={item.to}
                  >
                    <item.icon size={15} />
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
          </div>
        )}
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {!isLandingPage && !isAuthPage && (
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-600">Security-first exchange</p>
              <h1 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                {user ? 'Portfolio, wallets, trading, and account security' : 'Buy, sell, and trade crypto securely'}
              </h1>
            </div>

            <StatusPill icon={ShieldCheck} label="Security" value="Protected" tone="green" />
          </div>
        )}

        <div className="space-y-5">
          <Alert />
          <Outlet />
        </div>
      </div>
    </main>
  )
}

const AccountMenu = ({ isSecurityActive, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const accountInitial = useMemo(() => {
    return user.email?.trim()?.[0]?.toUpperCase() ?? 'U'
  }, [user.email])

  const accountLabel = useMemo(() => {
    if (!user?.email) return 'Not signed in'
    return user.email.length > 28 ? `${user.email.slice(0, 26)}...` : user.email
  }, [user])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`flex items-center gap-2 rounded-full border bg-white p-1.5 pr-2.5 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 ${
          isSecurityActive ? 'border-blue-200 ring-4 ring-blue-100' : 'border-slate-200'
        }`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="grid size-10 place-items-center rounded-full bg-[#0b111f] text-sm font-bold text-white">
          {accountInitial}
        </span>
        <ChevronDown className="text-slate-500" size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
          <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
            <span className="grid size-11 place-items-center rounded-full bg-[#0b111f] text-sm font-bold text-white">
              {accountInitial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950">{accountLabel}</p>
              <p className="text-xs font-medium text-slate-500">{user.role}</p>
            </div>
          </div>

          <div className="py-2">
            <button
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-400"
              type="button"
            >
              <UserCircle size={18} />
              Profile
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-slate-500">
                Soon
              </span>
            </button>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
              to="/security"
              onClick={() => setIsOpen(false)}
            >
              <ShieldCheck size={18} />
              Security center
            </NavLink>
            <button
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-400"
              type="button"
            >
              <Wallet size={18} />
              Profile settings
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-slate-500">
                Soon
              </span>
            </button>
          </div>

          <button
            className="flex w-full items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            type="button"
            onClick={() => {
              setIsOpen(false)
              onLogout()
            }}
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

const StatusPill = ({ icon: Icon, label, value, tone = 'slate' }) => {
  const toneClass =
    tone === 'green'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : 'border-slate-200 bg-white text-slate-700'

  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${toneClass}`}>
      <Icon size={16} />
      <div className="leading-tight">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="max-w-48 truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default AppShell
