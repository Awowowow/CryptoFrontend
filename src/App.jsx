import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminRoute from './components/layout/AdminRoute'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { hydrateSession } from './features/auth/authSlice'
import AdminKycPage from './pages/AdminKycPage'
import ExchangePage from './pages/ExchangePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import KycPage from './pages/KycPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SecurityPage from './pages/SecurityPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import WalletsPage from './pages/WalletsPage'
import PageLoader from './components/ui/PageLoader'

const HomeRoute = () => {
  const { sessionChecked, user } = useSelector((state) => state.auth)

  if (!sessionChecked) {
    return <PageLoader label="Loading exchange..." />
  }

  return user ? <Navigate replace to="/exchange" /> : <LandingPage />
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hydrateSession())
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<HomeRoute />} />
      <Route element={<AppShell />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/wallets" element={<WalletsPage />} />
          <Route path="/kyc" element={<KycPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/security" element={<SecurityPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/kyc" element={<AdminKycPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
