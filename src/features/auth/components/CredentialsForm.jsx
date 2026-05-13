import { ShieldCheck, UserPlus } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

const CredentialsForm = ({
  credentials,
  isLoading,
  mode,
  onChange,
  onSubmit,
}) => {
  const isLogin = mode === 'login'

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        autoComplete="email"
        label="Email"
        name="email"
        placeholder="aarav@example.com"
        type="email"
        value={credentials.email}
        onChange={onChange}
      />
      <Input
        autoComplete={isLogin ? 'current-password' : 'new-password'}
        label="Password"
        name="password"
        placeholder="Minimum 8 characters"
        type="password"
        value={credentials.password}
        onChange={onChange}
      />
      <Button
        className="w-full"
        disabled={isLoading}
        icon={isLogin ? ShieldCheck : UserPlus}
        type="submit"
      >
        {isLoading ? 'Working...' : isLogin ? 'Continue securely' : 'Create account'}
      </Button>
    </form>
  )
}

export default CredentialsForm
