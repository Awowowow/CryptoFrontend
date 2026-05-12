import { ArrowRightLeft, ChevronDown, ShieldCheck, UserCircle } from 'lucide-react'
import { useMemo } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Alert from '../ui/Alert'

const guestNav = [
  { label: 'Home', to: '/' },
  { label: 'Security', to: '/security' },
  { label: 'Buy Crypto', planned: true },
  { label: 'Markets', planned: true },
  { label: 'Fees', planned: true },
]

const appNav = [
  { label: 'Overview', to: '/overview' },
  { label: 'Security', to: '/security' },
  { label: 'Buy Crypto', planned: true },
  { label: 'Markets', planned: true },
  { label: 'Trade', planned: true },
  { label: 'Wallet', planned: true },
]

const authNav = [
  { label: 'Sign in', to: '/auth/login' },
  { label: 'Create account', to: '/auth/signup', featured: true },
]

const AppShell = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const visibleNav = user ? appNav : guestNav
  const isLandingPage = location.pathname === '/'

  const accountLabel = useMemo(() => {
    if (!user?.email) return 'Not signed in'
    return user.email.length > 26 ? `${user.email.slice(0, 24)}...` : user.email
  }, [user])

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" to={user ? '/overview' : '/'}>
            <div className="grid size-10 place-items-center rounded-xl bg-[#0b111f] text-white shadow-sm">
              <ArrowRightLeft size={21} />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-slate-950">CryptoEx</p>
              <p className="hidden text-xs font-medium text-slate-500 sm:block">Buy, sell, trade</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {visibleNav.map((item) =>
              item.planned ? (
                <button
                  className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400"
                  key={item.label}
                  title="Coming soon"
                  type="button"
                >
                  {item.label}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase text-slate-500">
                    Soon
                  </span>
                </button>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-slate-950 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            {!user &&
              authNav.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    item.featured
                      ? `rounded-lg px-3 py-2 text-sm font-semibold ${
                          isActive ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`
                      : `rounded-lg px-3 py-2 text-sm font-semibold ${
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
              <NavLink
                className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm sm:inline-flex"
                to="/security"
              >
                <UserCircle size={17} />
                {accountLabel}
                <ChevronDown size={15} />
              </NavLink>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 px-4 py-2 sm:px-6 lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">
            {visibleNav.map((item) =>
              item.planned ? (
                <span
                  className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400"
                  key={item.label}
                >
                  {item.label} soon
                </span>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    `shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
                    }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {!isLandingPage && (
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
