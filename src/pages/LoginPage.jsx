import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from '../components/ui/BrandLogo'
import CredentialsForm from '../features/auth/components/CredentialsForm'
import TwoFaChallenge from '../features/auth/components/TwoFaChallenge'
import { loginUser, verifyTwoFaLogin } from '../features/auth/authSlice'

const loginBenefits = [
  { icon: LockKeyhole, text: 'Secure cookie sessions' },
  { icon: Smartphone, text: 'Authenticator checks on new devices' },
  { icon: ShieldCheck, text: 'Trusted device support' },
]

const LoginPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { status, twoFaToken, user } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loginOtp, setLoginOtp] = useState('')
  const [rememberDevice, setRememberDevice] = useState(true)

  const isLoading = status === 'loading'

  useEffect(() => {
    if (user && !twoFaToken) {
      const destination = location.state?.from?.pathname ?? '/exchange'
      navigate(destination, { replace: true })
    }
  }, [location.state, navigate, twoFaToken, user])

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
    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative hidden min-h-[650px] overflow-hidden bg-[#08111f] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.35),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(16,185,129,0.16),transparent_26%)]" />
        <div className="relative">
          <BrandLogo
            className="inline-flex hover:bg-white/5"
            size="lg"
            subtitle="Secure exchange access"
            textTone="light"
          />

          <h1 className="mt-16 max-w-md text-5xl font-semibold leading-tight tracking-tight">
            Welcome back to your crypto account.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Sign in to manage account security today and prepare for funding, wallets, and trading
            as the exchange opens more features.
          </p>
        </div>

        <div className="relative grid gap-3">
          {loginBenefits.map((item) => (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3" key={item.text}>
              <item.icon className="text-blue-300" size={18} />
              <span className="text-sm font-medium text-slate-200">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[650px] items-center justify-center bg-slate-50 px-5 py-8 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandLogo className="inline-flex hover:bg-slate-100/70" size="md" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {twoFaToken ? 'Two-factor verification' : 'Sign in'}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              {twoFaToken ? 'Confirm it is you' : 'Access your account'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {twoFaToken
                ? 'Enter the 6-digit code from your authenticator app to finish signing in.'
                : 'Continue with your email and password. New devices may need an authenticator code.'}
            </p>

            <div className="mt-6">
              {twoFaToken ? (
                <TwoFaChallenge
                  asCard={false}
                  isLoading={isLoading}
                  otp={loginOtp}
                  rememberDevice={rememberDevice}
                  onOtpChange={setLoginOtp}
                  onRememberChange={setRememberDevice}
                  onSubmit={handleVerifyLoginOtp}
                />
              ) : (
                <CredentialsForm
                  credentials={credentials}
                  isLoading={isLoading}
                  mode="login"
                  onChange={handleCredentialsChange}
                  onSubmit={handleLogin}
                />
              )}
            </div>

            {!twoFaToken && (
              <div className="mt-6 space-y-3 text-center text-sm text-slate-500">
                <p>
                  <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/auth/forgot-password">
                    Forgot password?
                  </Link>
                </p>
                <p>
                  New to CryptoEx?{' '}
                  <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/auth/signup">
                    Create an account
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
