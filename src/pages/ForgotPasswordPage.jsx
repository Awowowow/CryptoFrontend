import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { forgotPassword } from '../features/auth/authSlice'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { Button } from '@/components/ui/button'

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(forgotPassword({ email }))
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Recovery</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter the email on your account and we will send a password reset link if the account exists.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            autoComplete="email"
            label="Email address"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button className="h-11 w-full" disabled={status === 'loading'} type="submit" variant="primary">
            <MailCheck />
            Send reset link
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Remembered it?{' '}
          <Link className="font-semibold text-blue-600" to="/auth/login">
            Back to sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
