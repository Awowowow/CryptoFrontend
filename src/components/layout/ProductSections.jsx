import {
  BadgeCheck,
  BarChart3,
  CreditCard,
  Headphones,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import Card from '../ui/Card'
import { formatCurrency, formatPercentage } from '../../lib/formatters'

const fallbackAssetCards = [
  { name: 'Bitcoin', symbol: 'BTC', status: 'Live market loading' },
  { name: 'Ethereum', symbol: 'ETH', status: 'Live market loading' },
  { name: 'Tether', symbol: 'USDT', status: 'Live market loading' },
]

const fundingMethods = [
  { icon: Landmark, title: 'Account funding', text: 'Keep deposits, withdrawals, and balances organized inside exchange wallets.' },
  { icon: CreditCard, title: 'Available balance', text: 'See what can be used immediately without mixing it with locked funds.' },
  { icon: Wallet, title: 'Locked balance', text: 'Track funds reserved for orders or protected actions separately from spendable funds.' },
]

const trustItems = [
  { icon: ShieldCheck, title: 'Two-factor protection', text: 'Use an authenticator app to protect sign-ins and sensitive account actions.' },
  { icon: BadgeCheck, title: 'Verified accounts', text: 'Email verification and identity review work together before regulated activity.' },
  { icon: LockKeyhole, title: 'Trusted device control', text: 'Known devices can sign in faster without weakening high-risk action checks.' },
  { icon: Headphones, title: 'Recovery flows', text: 'Password reset and device controls help users recover access without weakening the account.' },
]

/* Asset symbol initials for visual placeholder */
const symbolColor = {
  BTC: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  ETH: { bg: 'bg-blue-50',  text: 'text-blue-600',  border: 'border-blue-200'  },
  SOL: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  USDT: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
}

export const PopularAssets = ({ assets = [], status }) => {
  const assetCards = assets.length ? assets : fallbackAssetCards

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-blue-600">
            Live markets
          </span>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
            Follow the market before you trade
          </h2>
        </div>
        <div className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
          <BarChart3 size={18} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {assetCards.map((asset) => {
          const colors =
            symbolColor[asset.symbol] ??
            { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' }
          const hasLiveData = 'priceUsd' in asset
          const isPositive = asset.change24hPercent >= 0

          return (
            <div
              className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 hover:bg-slate-50"
              key={asset.symbol}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Symbol avatar */}
                  <div className={`grid size-9 shrink-0 place-items-center rounded-lg border ${colors.border} ${colors.bg}`}>
                    <span className={`text-xs font-bold ${colors.text}`}>{asset.symbol.slice(0, 1)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{asset.name}</p>
                    <p className="font-mono text-xs text-slate-400">{asset.symbol}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700">
                  {hasLiveData ? 'Live' : status === 'failed' ? 'Offline' : 'Loading'}
                </span>
              </div>
              {hasLiveData ? (
                <div className="mt-4 flex items-end justify-between gap-3">
                  <p className="text-lg font-bold text-slate-950">
                    {formatCurrency(asset.priceUsd, asset.priceUsd < 1 ? 4 : 2)}
                  </p>
                  <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatPercentage(asset.change24hPercent)}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-xs leading-5 text-slate-500">{asset.status}</p>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export const FundingMethods = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
        <div>
          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-blue-600">
            Wallets
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Wallets that separate what is available from what is reserved.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            A real exchange account needs more than a total number. CryptoEx keeps usable funds and
            locked funds distinct so future orders and withdrawals stay easy to reason about.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {fundingMethods.map((method) => (
            <div
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5"
              key={method.title}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
              <div className="grid size-11 place-items-center rounded-xl border border-blue-100 bg-white text-blue-600 shadow-sm">
                <method.icon size={20} />
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900">{method.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{method.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const TrustAndSecurity = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#07101e] text-white shadow-xl">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-96 rounded-full bg-emerald-700/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:p-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.4)]" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300">Security</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Designed to protect accounts before funds move.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Security is part of the account foundation: verified access, authenticator checks,
            trusted devices, and step-up protection for sensitive actions.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {trustItems.map((item) => (
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 transition hover:bg-white/[0.08]"
              key={item.title}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="grid size-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <item.icon size={19} />
              </div>
              <p className="mt-4 text-base font-semibold text-white">{item.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
