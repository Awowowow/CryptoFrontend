import { BadgeCheck, Smartphone } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const TwoFaChallenge = ({
  asCard = true,
  isLoading,
  otp,
  rememberDevice,
  onOtpChange,
  onRememberChange,
  onSubmit,
}) => {
  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
          <Smartphone size={20} />
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-blue-500" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Authenticator required</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Password accepted — enter your 6-digit code.
          </p>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <Input
          autoComplete="one-time-code"
          inputMode="numeric"
          label="One-time code"
          maxLength={6}
          placeholder="000000"
          value={otp}
          onChange={(event) => onOtpChange(event.target.value)}
        />

        {/* Device trust checkbox */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50/40">
          <input
            checked={rememberDevice}
            className="size-4 accent-blue-600"
            type="checkbox"
            onChange={(event) => onRememberChange(event.target.checked)}
          />
          <div>
            <p className="text-sm font-medium text-slate-700">Trust this device</p>
            <p className="text-xs text-slate-400">Skip 2FA on future logins from this browser</p>
          </div>
        </label>

        <Button className="w-full" disabled={isLoading} icon={BadgeCheck} type="submit">
          {isLoading ? 'Verifying...' : 'Verify and sign in'}
        </Button>
      </form>
    </>
  )

  if (!asCard) {
    return content
  }

  return (
    <Card className="relative overflow-hidden border-blue-200 bg-blue-50/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      {content}
    </Card>
  )
}

export default TwoFaChallenge