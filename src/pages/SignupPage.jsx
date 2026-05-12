import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/ui/Card'
import AuthInfoPanel from '../features/auth/components/AuthInfoPanel'
import CredentialsForm from '../features/auth/components/CredentialsForm'
import { signupUser } from '../features/auth/authSlice'

const SignupPage = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleCredentialsChange = (event) => {
    setCredentials((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    await dispatch(signupUser(credentials))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <p className="text-sm font-semibold uppercase text-blue-600">Create account</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Open your exchange profile</h2>
        <p className="mb-5 mt-2 text-sm text-slate-500">
          Start with email verification and a password-protected account.
        </p>
        <CredentialsForm
          credentials={credentials}
          isLoading={status === 'loading'}
          mode="signup"
          onChange={handleCredentialsChange}
          onSubmit={handleSignup}
        />
      </Card>
      <AuthInfoPanel title="Secure from the first credential" />
    </div>
  )
}

export default SignupPage
