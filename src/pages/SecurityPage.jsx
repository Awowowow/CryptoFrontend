import { useEffect, useState } from 'react'
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
  fetchTrustedDevices,
  revokeTrustedDevice,
  setupTwoFa,
  verifyRecentTwoFa,
  verifyTwoFaSetup,
} from '../features/auth/authSlice'
import Card from '../components/ui/Card'

const SecurityPage = () => {
  const dispatch = useDispatch()
  const { recentTwoFaVerified, status, trustedDevices, twoFaSetup, user } = useSelector((state) => state.auth)
  const [setupOtp, setSetupOtp] = useState('')
  const [recentOtp, setRecentOtp] = useState('')

  const isLoading = status === 'loading'

  useEffect(() => {
    if (user) {
      dispatch(fetchTrustedDevices())
    }
  }, [dispatch, user])

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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#07101e] text-white shadow-2xl">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-96 rounded-full bg-blue-700/10 blur-3xl" />

        <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
              <span className="text-xs font-semibold tracking-wider text-emerald-300">
                Security center
              </span>
            </span>
            <h1 className="mt-5 max-w-xl text-[2.25rem] font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Protect your account before{' '}
              <span className="text-blue-400">money moves.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[0.9rem] leading-7 text-slate-400">
              Manage sign-in protection, authenticator setup, trusted login state, and extra
              verification for sensitive actions from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 backdrop-blur-sm">
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-500">
              Signed in as
            </p>
            <p className="mt-1.5 truncate font-mono text-lg font-semibold text-white">
              {user.email}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <SecurityMetric label="Role" value={user.role} />
              <SecurityMetric
                label="Security"
                value={securityScore}
                highlight={securityScore === 'Strong'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Status strip ── */}
      <section className="grid gap-4 md:grid-cols-3">
        {statusCards.map((card) => (
          <StatusCard {...card} key={card.label} />
        ))}
      </section>

      {/* ── Main content ── */}
      <section className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-6">
          <SessionCard
            isLoading={isLoading}
            recentTwoFaVerified={recentTwoFaVerified}
            user={user}
            onLogout={() => dispatch(logoutUser())}
          />

          {/* Roadmap card */}
          <Card className="relative overflow-hidden border-slate-800 bg-slate-950 text-white">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-400">
                <LockKeyhole size={19} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Protection roadmap</h2>
                <p className="text-sm text-slate-500">Next account controls for CryptoEx.</p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {['Device history', 'Trusted device revocation', 'Password change alerts'].map((item, i) => (
                <div
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3"
                  key={item}
                >
                  <span className="w-5 shrink-0 text-center font-mono text-[0.6875rem] font-bold text-slate-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <KeyRound className="shrink-0 text-blue-400/70" size={15} />
                  <span className="text-sm font-medium text-slate-300">{item}</span>
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
          <TrustedDevicesCard
            devices={trustedDevices}
            isLoading={isLoading}
            onRevoke={(trustedDeviceId) => dispatch(revokeTrustedDevice(trustedDeviceId))}
          />
        </div>
      </section>
    </div>
  )
}

const TrustedDevicesCard = ({ devices, isLoading, onRevoke }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <h2 className="text-base font-semibold text-slate-900">Trusted devices</h2>
      <p className="mt-1 text-sm text-slate-500">
        Devices that may skip login OTP, while sensitive actions still require fresh verification.
      </p>

      <div className="mt-5 space-y-3">
        {devices.map((device) => (
          <div className="rounded-xl border border-slate-200 p-4" key={device.id}>
            <p className="truncate text-sm font-semibold text-slate-950">
              {device.userAgent || 'Unknown device'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              IP {device.ipAddress || 'Unknown'} · expires {new Date(device.expiresAt).toLocaleDateString()}
            </p>
            <button
              className="mt-3 text-sm font-semibold text-rose-600 hover:text-rose-700"
              disabled={isLoading}
              type="button"
              onClick={() => onRevoke(device.id)}
            >
              Revoke device
            </button>
          </div>
        ))}

        {!devices.length && <p className="text-sm text-slate-500">No trusted devices yet.</p>}
      </div>
    </Card>
  )
}

const SecurityMetric = ({ label, value, highlight }) => {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.05] p-4">
      <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`mt-2 text-base font-semibold ${highlight ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}

const StatusCard = ({ icon: Icon, label, tone, value }) => {
  const isGreen = tone === 'green'

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-px ${
        isGreen
          ? 'bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent'
          : 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent'
      }`} />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`relative grid size-11 shrink-0 place-items-center rounded-xl border ${
          isGreen
            ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
            : 'border-amber-200 bg-amber-50 text-amber-600'
        }`}>
          <Icon size={20} />
          <span className={`absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white ${
            isGreen ? 'bg-emerald-500' : 'bg-amber-400'
          }`} />
        </div>
      </div>
    </Card>
  )
}

const SignedOutSecurityState = () => {
  return (
    <Card className="relative min-h-[28rem] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.06),transparent_60%)]" />
      <div className="relative">
        <div className="inline-grid size-12 place-items-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-500">
          <AlertCircle size={22} />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          Sign in required
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Session controls, authenticator setup, and step-up verification appear after login.
        </p>
      </div>
    </Card>
  )
}

export default SecurityPage
