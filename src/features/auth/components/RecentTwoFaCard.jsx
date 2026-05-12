import { ShieldCheck, ShieldEllipsis } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const RecentTwoFaCard = ({ isLoading, otp, recentTwoFaVerified, onOtpChange, onSubmit }) => {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <ShieldEllipsis className="text-amber-600" size={22} />
        <div>
          <h2 className="text-lg font-semibold">Step-up verification</h2>
          <p className="text-sm text-slate-500">Refresh recent 2FA before high-risk actions.</p>
        </div>
      </div>
      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <Input
          label="Authenticator code"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(event) => onOtpChange(event.target.value)}
        />
        <Button className="w-full" disabled={isLoading} icon={ShieldCheck} type="submit">
          {recentTwoFaVerified ? 'Refresh step-up window' : 'Verify recent 2FA'}
        </Button>
      </form>
      <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm font-semibold text-amber-900">Dangerous-action guard is ready.</p>
        <p className="mt-1 text-sm text-amber-800">
          Wallet withdrawals, account recovery, and security changes will use this extra check.
        </p>
      </div>
    </Card>
  )
}

export default RecentTwoFaCard
