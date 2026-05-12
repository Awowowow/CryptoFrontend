import { MailCheck } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

const EmailVerificationForm = ({ isLoading, onSubmit, onTokenChange, token }) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        label="Verification token"
        placeholder="Paste email token"
        value={token}
        onChange={(event) => onTokenChange(event.target.value)}
      />
      <Button className="w-full" disabled={isLoading} icon={MailCheck} type="submit">
        {isLoading ? 'Working...' : 'Verify email'}
      </Button>
    </form>
  )
}

export default EmailVerificationForm
