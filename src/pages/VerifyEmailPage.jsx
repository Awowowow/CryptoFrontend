import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/ui/Card'
import AuthInfoPanel from '../features/auth/components/AuthInfoPanel'
import EmailVerificationForm from '../features/auth/components/EmailVerificationForm'
import { verifyEmail } from '../features/auth/authSlice'

const VerifyEmailPage = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [token, setToken] = useState('')

  const handleVerifyEmail = async (event) => {
    event.preventDefault()
    await dispatch(verifyEmail(token.trim()))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <p className="text-sm font-semibold uppercase text-blue-600">Email verification</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Confirm account ownership</h2>
        <p className="mb-5 mt-2 text-sm text-slate-500">
          Paste the verification token from your email to activate your account.
        </p>
        <EmailVerificationForm
          isLoading={status === 'loading'}
          token={token}
          onSubmit={handleVerifyEmail}
          onTokenChange={setToken}
        />
      </Card>
      <AuthInfoPanel title="Verified identity before account access" />
    </div>
  )
}

export default VerifyEmailPage
