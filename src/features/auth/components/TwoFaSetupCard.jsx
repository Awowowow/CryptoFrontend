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
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Authenticator setup</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Scan QR code with your authenticator app.
          </p>
        </div>
        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
          <QrCode size={18} />
        </div>
      </div>

      {!user.isTwoFaEnabled && (
        <Button
          className="mt-5 w-full"
          disabled={isLoading}
          icon={QrCode}
          variant="dark"
          onClick={onSetup}
        >
          Generate 2FA setup
        </Button>
      )}

      {setup && (
        <div className="mt-5 space-y-4">
          {/* QR Code display */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <img
              alt="2FA setup QR code"
              className="size-40 rounded-lg shadow-sm"
              src={setup.qrCodeDataUrl}
            />
            <p className="text-xs text-slate-400">Scan with Google Authenticator or Authy</p>
          </div>

          {/* Manual key */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
              Manual entry key
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-xs tracking-widest text-slate-700">
                {setup.manualEntryKey}
              </code>
              <button
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                type="button"
                onClick={onCopy}
              >
                <Copy size={15} />
              </button>
            </div>
          </div>

          {/* Verify form */}
          <form className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4" onSubmit={onVerifySetup}>
            <div>
              <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
                Confirm setup
              </p>
              <Input
                label="Verification code"
                maxLength={6}
                placeholder="Enter 6-digit code from app"
                value={setupOtp}
                onChange={(event) => onSetupOtpChange(event.target.value)}
              />
            </div>
            <Button className="w-full" disabled={isLoading} icon={CheckCircle2} type="submit">
              {isLoading ? 'Enabling...' : 'Enable 2FA'}
            </Button>
          </form>
        </div>
      )}
    </Card>
  )
}

export default TwoFaSetupCard