import { ShieldCheck, ShieldEllipsis } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const RecentTwoFaCard = ({ isLoading, otp, recentTwoFaVerified, onOtpChange, onSubmit }) => {
  return (
    <Card className="relative overflow-hidden">
      {/* Amber top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
          <ShieldEllipsis size={20} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Step-up verification</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Required before high-risk account actions.
          </p>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <Input
          label="Authenticator code"
          maxLength={6}
          placeholder="000000"
          value={otp}
          onChange={(event) => onOtpChange(event.target.value)}
        />
        <Button className="w-full" disabled={isLoading} icon={ShieldCheck} type="submit">
          {recentTwoFaVerified ? 'Re-verify step-up check' : 'Verify recent 2FA'}
        </Button>
      </form>

      {/* Guard status */}
      <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/60 px-4 py-3">
        <div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-amber-500 shadow-[0_0_6px_2px_rgba(245,158,11,0.4)]" />
        <div>
          <p className="text-sm font-semibold text-amber-900">Dangerous-action guard active</p>
          <p className="mt-0.5 text-xs leading-relaxed text-amber-700">
            Withdrawals, account recovery, and security changes require this check.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default RecentTwoFaCard