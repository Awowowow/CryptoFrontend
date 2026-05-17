import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import { resetPassword } from '../features/auth/authSlice'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { Button } from '@/components/ui/button'

const ResetPasswordPage = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState(searchParams.get('token') ?? '')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(resetPassword({ token, newPassword }))
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Recovery</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Choose a new password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use the reset token from your email and create a new password with at least 8 characters.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Reset token"
            placeholder="Paste token from email"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
          <Input
            autoComplete="new-password"
            label="New password"
            placeholder="Minimum 8 characters"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Button className="h-11 w-full" disabled={status === 'loading'} type="submit" variant="primary">
            <KeyRound />
            Update password
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Password changed?{' '}
          <Link className="font-semibold text-blue-600" to="/auth/login">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
