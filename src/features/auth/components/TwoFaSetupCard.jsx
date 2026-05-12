import { CheckCircle2, Copy, QrCode } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const TwoFaSetupCard = ({
  isLoading,
  setup,
  setupOtp,
  user,
  onCopy,
  onSetup,
  onSetupOtpChange,
  onVerifySetup,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Authenticator setup</h2>
          <p className="text-sm text-slate-500">Generate QR code and verify setup OTP.</p>
        </div>
        <QrCode className="text-slate-500" size={22} />
      </div>

      {!user.isTwoFaEnabled && (
        <Button className="mt-5 w-full" disabled={isLoading} icon={QrCode} variant="dark" onClick={onSetup}>
          Generate 2FA setup
        </Button>
      )}

      {setup && (
        <div className="mt-5 space-y-4">
          <div className="grid place-items-center rounded-lg border border-slate-200 bg-slate-50 p-4">
            <img alt="2FA setup QR code" className="size-44 rounded-md" src={setup.qrCodeDataUrl} />
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs font-medium uppercase text-slate-500">Manual key</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 overflow-hidden rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-700">
                {setup.manualEntryKey}
              </code>
              <button className="rounded-md border border-slate-200 p-2" type="button" onClick={onCopy}>
                <Copy size={16} />
              </button>
            </div>
          </div>
          <form className="space-y-4" onSubmit={onVerifySetup}>
            <Input
              label="Setup verification code"
              maxLength={6}
              placeholder="123456"
              value={setupOtp}
              onChange={(event) => onSetupOtpChange(event.target.value)}
            />
            <Button className="w-full" disabled={isLoading} icon={CheckCircle2} type="submit">
              Enable 2FA
            </Button>
          </form>
        </div>
      )}
    </Card>
  )
}

export default TwoFaSetupCard
