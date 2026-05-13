import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BadgeCheck, LockKeyhole, MailCheck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/ui/BrandLogo'
import CredentialsForm from '../features/auth/components/CredentialsForm'
import { signupUser } from '../features/auth/authSlice'

const signupSteps = [
  { icon: MailCheck, text: 'Verify your email address' },
  { icon: LockKeyhole, text: 'Create a protected password' },
  { icon: BadgeCheck, text: 'Enable authenticator security after login' },
]

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
    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1.08fr_0.92fr]">
      <section className="flex min-h-[650px] items-center justify-center bg-slate-50 px-5 py-8 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandLogo className="inline-flex hover:bg-slate-100/70" size="md" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Create account
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Start your CryptoEx account
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create your account now, verify your email, then add authenticator protection before
              trading features open.
            </p>

            <div className="mt-6">
              <CredentialsForm
                credentials={credentials}
                isLoading={status === 'loading'}
                mode="signup"
                onChange={handleCredentialsChange}
                onSubmit={handleSignup}
              />
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/auth/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden min-h-[650px] overflow-hidden bg-[#08111f] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.24),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.34),transparent_28%)]" />
        <div className="relative">
          <BrandLogo
            className="inline-flex hover:bg-white/5"
            size="lg"
            subtitle="Account opening"
            textTone="light"
          />

          <h1 className="mt-16 max-w-md text-5xl font-semibold leading-tight tracking-tight">
            Your first step into secure crypto trading.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Build a verified profile first. Wallet funding, market access, and trading eligibility
            can grow from this account foundation.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-white/8 p-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="grid size-10 place-items-center rounded-xl bg-emerald-400 text-slate-950">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Account setup</p>
              <p className="text-xs text-slate-400">Built for security from the first login</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {signupSteps.map((step) => (
              <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3" key={step.text}>
                <step.icon className="text-emerald-300" size={18} />
                <span className="text-sm font-medium text-slate-200">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupPage
