import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AlertCircle,
  BadgeCheck,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Smartphone,
} from 'lucide-react'
import RecentTwoFaCard from '../features/auth/components/RecentTwoFaCard'
import SessionCard from '../features/auth/components/SessionCard'
import TwoFaSetupCard from '../features/auth/components/TwoFaSetupCard'
import {
  logoutUser,
  setupTwoFa,
  verifyRecentTwoFa,
  verifyTwoFaSetup,
} from '../features/auth/authSlice'
import Card from '../components/ui/Card'

const SecurityPage = () => {
  const dispatch = useDispatch()
  const { recentTwoFaVerified, status, twoFaSetup, user } = useSelector((state) => state.auth)
  const [setupOtp, setSetupOtp] = useState('')
  const [recentOtp, setRecentOtp] = useState('')

  const isLoading = status === 'loading'

  const handleSetupTwoFa = async () => {
    await dispatch(setupTwoFa())
  }

  const handleVerifySetupOtp = async (event) => {
    event.preventDefault()
    await dispatch(verifyTwoFaSetup({ otp: setupOtp }))
    setSetupOtp('')
  }

  const handleVerifyRecentOtp = async (event) => {
    event.preventDefault()
    await dispatch(verifyRecentTwoFa({ otp: recentOtp }))
    setRecentOtp('')
  }

  const copyManualKey = async () => {
    if (twoFaSetup?.manualEntryKey) {
      await navigator.clipboard.writeText(twoFaSetup.manualEntryKey)
    }
  }

  if (!user) {
    return <SignedOutSecurityState />
  }

  const securityScore = user.isTwoFaEnabled ? (recentTwoFaVerified ? 'Strong' : 'Protected') : 'Needs 2FA'

  const statusCards = [
    {
      icon: BadgeCheck,
      label: 'Email status',
      tone: 'green',
      value: 'Verified',
    },
    {
      icon: Smartphone,
      label: 'Authenticator',
      tone: user.isTwoFaEnabled ? 'green' : 'amber',
      value: user.isTwoFaEnabled ? 'Enabled' : 'Not enabled',
    },
    {
      icon: Fingerprint,
      label: 'Recent 2FA',
      tone: recentTwoFaVerified ? 'green' : 'amber',
      value: recentTwoFaVerified ? 'Fresh' : 'Required',
    },
  ]

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#08111f] text-white shadow-xl">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              Security center
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Protect your account before money moves.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Manage sign-in protection, authenticator setup, trusted login state, and extra
              verification for sensitive actions from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-sm font-medium text-slate-300">Account</p>
            <p className="mt-1 truncate text-xl font-semibold">{user.email}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <SecurityMetric label="Role" value={user.role} />
              <SecurityMetric label="Security" value={securityScore} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {statusCards.map((card) => (
          <StatusCard {...card} key={card.label} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-6">
          <SessionCard
            isLoading={isLoading}
            recentTwoFaVerified={recentTwoFaVerified}
            user={user}
            onLogout={() => dispatch(logoutUser())}
          />
          <Card className="bg-slate-950 text-white">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-blue-500">
                <LockKeyhole size={21} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Protection roadmap</h2>
                <p className="text-sm text-slate-400">Next account controls planned for CryptoEx.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {['Device history', 'Trusted device revocation', 'Password change alerts'].map((item) => (
                <div className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3" key={item}>
                  <KeyRound className="text-blue-300" size={17} />
                  <span className="text-sm font-medium text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <TwoFaSetupCard
            isLoading={isLoading}
            setup={twoFaSetup}
            setupOtp={setupOtp}
            user={user}
            onCopy={copyManualKey}
            onSetup={handleSetupTwoFa}
            onSetupOtpChange={setSetupOtp}
            onVerifySetup={handleVerifySetupOtp}
          />
          <RecentTwoFaCard
            isLoading={isLoading}
            otp={recentOtp}
            recentTwoFaVerified={recentTwoFaVerified}
            onOtpChange={setRecentOtp}
            onSubmit={handleVerifyRecentOtp}
          />
        </div>
      </section>
    </div>
  )
}

const SecurityMetric = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  )
}

const StatusCard = ({ icon: Icon, label, tone, value }) => {
  const toneClass =
    tone === 'green'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-amber-50 text-amber-700'

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className={`grid size-12 place-items-center rounded-2xl ${toneClass}`}>
          <Icon size={23} />
        </div>
      </div>
    </Card>
  )
}

const SignedOutSecurityState = () => {
  return (
    <Card className="min-h-96">
      <div className="inline-grid size-12 place-items-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-500">
        <AlertCircle size={22} />
      </div>
      <h2 className="mt-5 text-2xl font-semibold text-slate-950">Sign in required</h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Session controls, authenticator setup, and step-up verification appear after login.
      </p>
    </Card>
  )
}

export default SecurityPage
