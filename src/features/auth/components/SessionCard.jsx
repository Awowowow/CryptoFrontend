import { LogOut } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const SessionCard = ({ isLoading, recentTwoFaVerified, user, onLogout }) => {
  return (
    <Card className="relative overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Active session</h2>
          <p className="mt-1 font-mono text-sm text-slate-500">{user.email}</p>
        </div>

        {/* Role badge */}
        <span className={`shrink-0 rounded-md border px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest ${
          user.role === 'ADMIN'
            ? 'border-rose-200 bg-rose-50 text-rose-700'
            : 'border-emerald-200 bg-emerald-50 text-emerald-700'
        }`}>
          {user.role}
        </span>
      </div>

      {/* Metrics */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate-400">
            2FA status
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`size-2 rounded-full ${
              user.isTwoFaEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`} />
            <p className="text-lg font-semibold leading-none text-slate-950">
              {user.isTwoFaEnabled ? 'Enabled' : 'Not enabled'}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate-400">
            Step-up window
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`size-2 rounded-full ${
              recentTwoFaVerified ? 'bg-emerald-500' : 'bg-amber-400'
            }`} />
            <p className="text-lg font-semibold leading-none text-slate-950">
              {recentTwoFaVerified ? 'Verified' : 'Not fresh'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Button disabled={isLoading} icon={LogOut} variant="secondary" onClick={onLogout}>
          Sign out
        </Button>
      </div>
    </Card>
  )
}

export default SessionCard
