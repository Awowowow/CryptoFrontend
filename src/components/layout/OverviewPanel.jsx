import { LockKeyhole } from 'lucide-react'
import { securityCapabilities } from '../../config/authEndpoints'
import Card from '../ui/Card'
import Metric from '../ui/Metric'

export const ExchangeOverview = ({ user, recentTwoFaVerified }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-blue-600">
            Portfolio access
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your account security center.
          </h2>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-7 text-slate-500">
            Manage sign-in, trusted devices, authenticator setup, and recent verification before
            funding or trading features are opened.
          </p>
        </div>

        {/* Metric pair */}
        <div className="grid min-w-60 grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
              Account
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className={`size-2 rounded-full ${user ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <Metric label="" value={user ? 'Signed in' : 'Guest'} />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
              Recent 2FA
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className={`size-2 rounded-full ${recentTwoFaVerified ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              <Metric label="" value={recentTwoFaVerified ? 'Fresh' : 'Required'} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const SecurityPanel = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="flex items-center gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <LockKeyhole size={19} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Account protection</h2>
          <p className="text-sm text-slate-500">Security features available to users.</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {securityCapabilities.map((row) => {
          const isLive = row.status?.toLowerCase() === 'live'
          const isSoon = row.status?.toLowerCase() === 'soon'

          return (
            <div
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
              key={row.label}
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{row.value}</p>
              </div>
              <span className={`shrink-0 rounded-md border px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider ${
                isLive
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : isSoon
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-slate-200 bg-slate-100 text-slate-600'
              }`}>
                {row.status}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}