import { LogOut } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Metric from '../../../components/ui/Metric'
import Button from '../../../components/ui/Button'

const SessionCard = ({ isLoading, recentTwoFaVerified, user, onLogout }) => {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Account session</h2>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        </div>
        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {user.role}
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Metric label="2FA status" value={user.isTwoFaEnabled ? 'Enabled' : 'Not enabled'} />
        <Metric label="Step-up window" value={recentTwoFaVerified ? 'Verified' : 'Not fresh'} />
      </div>
      <div className="mt-5">
        <Button disabled={isLoading} icon={LogOut} variant="secondary" onClick={onLogout}>
          Log out
        </Button>
      </div>
    </Card>
  )
}

export default SessionCard
