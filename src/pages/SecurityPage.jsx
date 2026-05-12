import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExchangeOverview, SecurityPanel } from '../components/layout/OverviewPanel'
import RecentTwoFaCard from '../features/auth/components/RecentTwoFaCard'
import SessionCard from '../features/auth/components/SessionCard'
import TwoFaSetupCard from '../features/auth/components/TwoFaSetupCard'
import {
  logoutUser,
  refreshSession,
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

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.92fr]">
      <section className="space-y-5">
        <ExchangeOverview user={user} recentTwoFaVerified={recentTwoFaVerified} />
        <SecurityPanel />
      </section>

      <section className="space-y-5">
        {user ? (
          <>
            <SessionCard
              isLoading={isLoading}
              recentTwoFaVerified={recentTwoFaVerified}
              user={user}
              onLogout={() => dispatch(logoutUser())}
              onRefresh={() => dispatch(refreshSession())}
            />
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
          </>
        ) : (
          <Card>
            <h2 className="text-lg font-semibold">Sign in required</h2>
            <p className="mt-2 text-sm text-slate-500">
              Session, authenticator setup, and step-up verification controls appear after login.
            </p>
          </Card>
        )}
      </section>
    </div>
  )
}

export default SecurityPage
