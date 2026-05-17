import { MailCheck } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

const EmailVerificationForm = ({ isLoading, onSubmit, onTokenChange, token }) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {/* Token input hint */}
      <div>
        <Input
          label="Verification token"
          placeholder="Paste token from your email"
          value={token}
          onChange={(event) => onTokenChange(event.target.value)}
        />
        <p className="mt-2 text-xs text-slate-400">
          Check your inbox — the token expires in 15 minutes.
        </p>
      </div>

      <Button className="w-full" disabled={isLoading} icon={MailCheck} type="submit">
        {isLoading ? 'Working...' : 'Verify email'}
      </Button>

      {/* Visual token format hint */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs font-medium text-slate-500">Expected format</p>
        <p className="mt-1 font-mono text-xs tracking-wide text-slate-400">
          xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        </p>
      </div>
    </form>
  )
}

export default EmailVerificationForm