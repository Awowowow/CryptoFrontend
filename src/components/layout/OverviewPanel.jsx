import { LockKeyhole } from 'lucide-react'
import { securityCapabilities } from '../../config/authEndpoints'
import Card from '../ui/Card'
import Metric from '../ui/Metric'

export const ExchangeOverview = ({ user, recentTwoFaVerified }) => {
  return (
    <Card>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Portfolio access</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Your account security center.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Manage sign-in, trusted devices, authenticator setup, and recent verification before
            funding or trading features are opened.
          </p>
        </div>
        <div className="grid min-w-64 grid-cols-2 gap-3">
          <Metric label="Account state" value={user ? 'Signed in' : 'Guest'} />
          <Metric label="Recent 2FA" value={recentTwoFaVerified ? 'Fresh' : 'Required'} />
        </div>
      </div>
    </Card>
  )
}

export const SecurityPanel = () => {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <LockKeyhole className="text-blue-600" size={22} />
        <div>
          <h2 className="text-lg font-semibold">Account protection</h2>
          <p className="text-sm text-slate-500">Security features available to users.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {securityCapabilities.map((row) => (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3" key={row.label}>
            <div>
              <p className="font-medium text-slate-950">{row.label}</p>
              <p className="text-sm text-slate-500">{row.value}</p>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
