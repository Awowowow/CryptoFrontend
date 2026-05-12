import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/ui/Card'
import CredentialsForm from '../features/auth/components/CredentialsForm'
import TwoFaChallenge from '../features/auth/components/TwoFaChallenge'
import { loginUser, verifyTwoFaLogin } from '../features/auth/authSlice'
import AuthInfoPanel from '../features/auth/components/AuthInfoPanel'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { status, twoFaToken } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loginOtp, setLoginOtp] = useState('')
  const [rememberDevice, setRememberDevice] = useState(true)

  const isLoading = status === 'loading'

  const handleCredentialsChange = (event) => {
    setCredentials((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(loginUser(credentials))
  }

  const handleVerifyLoginOtp = async (event) => {
    event.preventDefault()
    await dispatch(
      verifyTwoFaLogin({
        twoFaToken,
        otp: loginOtp,
        rememberDevice,
      }),
    )
    setLoginOtp('')
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-5">
        <Card>
          <p className="text-sm font-semibold uppercase text-blue-600">Sign in</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Access your exchange account</h2>
          <p className="mb-5 mt-2 text-sm text-slate-500">
            Password login with trusted-device aware 2FA.
          </p>
        <CredentialsForm
          credentials={credentials}
          isLoading={isLoading}
          mode="login"
          onChange={handleCredentialsChange}
          onSubmit={handleLogin}
        />
        </Card>
        <AuthInfoPanel />
      </section>

      {twoFaToken ? (
        <TwoFaChallenge
          isLoading={isLoading}
          otp={loginOtp}
          rememberDevice={rememberDevice}
          onOtpChange={setLoginOtp}
          onRememberChange={setRememberDevice}
          onSubmit={handleVerifyLoginOtp}
        />
      ) : (
        <Card>
          <h2 className="text-lg font-semibold">Login state</h2>
          <p className="mt-2 text-sm text-slate-500">
            If this browser is new, you will be asked for an authenticator code before the account
            opens.
          </p>
        </Card>
      )}
    </div>
  )
}

export default LoginPage
