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
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-1">
        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
          value={credentials.email}
          onChange={onChange}
        />
      </div>

      <div className="space-y-1">
        <Input
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          label="Password"
          name="password"
          placeholder={isLogin ? 'Enter your password' : 'Minimum 8 characters'}
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>

      {/* Subtle divider before submit */}
      <div className="pt-1">
        <Button
          className="w-full"
          disabled={isLoading}
          icon={isLogin ? ShieldCheck : UserPlus}
          type="submit"
        >
          {isLoading ? 'Working...' : isLogin ? 'Continue securely' : 'Create account'}
        </Button>
      </div>

      {isLogin && (
        <p className="text-center text-xs text-slate-400">
          Protected by session-bound authentication
        </p>
      )}
    </form>
  )
}

export default CredentialsForm