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
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-blue-700">
          <Smartphone size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Enter authenticator code</h2>
          <p className="text-sm text-slate-500">Password accepted. Complete 2FA to sign in.</p>
        </div>
      </div>
      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <Input
          autoComplete="one-time-code"
          inputMode="numeric"
          label="Authenticator code"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(event) => onOtpChange(event.target.value)}
        />
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          <input
            checked={rememberDevice}
            className="size-4 accent-blue-600"
            type="checkbox"
            onChange={(event) => onRememberChange(event.target.checked)}
          />
          Trust this device for future logins
        </label>
        <Button className="w-full" disabled={isLoading} icon={BadgeCheck} type="submit">
          {isLoading ? 'Working...' : 'Verify and sign in'}
        </Button>
      </form>
    </>
  )

  if (!asCard) {
    return content
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      {content}
    </Card>
  )
}

export default TwoFaChallenge
