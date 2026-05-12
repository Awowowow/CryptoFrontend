import { BadgeCheck, Smartphone } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const TwoFaChallenge = ({
  isLoading,
  otp,
  rememberDevice,
  onOtpChange,
  onRememberChange,
  onSubmit,
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <div className="flex items-center gap-3">
        <Smartphone className="text-blue-700" size={22} />
        <div>
          <h2 className="text-lg font-semibold text-slate-950">2FA challenge</h2>
          <p className="text-sm text-blue-800">Password accepted. Enter your authenticator code.</p>
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
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
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
    </Card>
  )
}

export default TwoFaChallenge
