import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, MailCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import AuthInfoPanel from '../features/auth/components/AuthInfoPanel'
import EmailVerificationForm from '../features/auth/components/EmailVerificationForm'
import { verifyEmail } from '../features/auth/authSlice'

const VerifyEmailPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { status } = useSelector((state) => state.auth)
  const queryToken = searchParams.get('token') ?? ''
  const [token, setToken] = useState(queryToken)
  const [isVerified, setIsVerified] = useState(false)
  const hasAutoSubmittedRef = useRef(false)
  const redirectTimerRef = useRef(null)

  const verifyToken = useCallback(async (verificationToken) => {
    await dispatch(verifyEmail(verificationToken)).unwrap()
    setIsVerified(true)

    redirectTimerRef.current = window.setTimeout(() => {
      navigate('/auth/login', { replace: true })
    }, 1800)
  }, [dispatch, navigate])

  useEffect(() => {
    if (!queryToken || hasAutoSubmittedRef.current) return

    hasAutoSubmittedRef.current = true
    verifyToken(queryToken)
  }, [queryToken, verifyToken])

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current)
      }
    }
  }, [])

  const handleVerifyEmail = async (event) => {
    event.preventDefault()
    await verifyToken(token.trim())
  }

  /* ── Verified success state ── */
  if (isVerified) {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="relative min-h-96 overflow-hidden">
          {/* Radial emerald glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.08),transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="relative flex flex-col">
            <div className="inline-grid size-14 place-items-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={26} />
            </div>

            <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
              <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_2px_rgba(52,211,153,0.4)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Email verified
              </span>
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Your account is ready.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Verification complete. Redirecting you to sign in now.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="size-1.5 shrink-0 rounded-full bg-blue-500" />
              <p className="text-xs text-slate-500">
                You'll be redirected automatically in a moment…
              </p>
            </div>

            <Link
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98]"
              to="/auth/login"
            >
              Go to login
              <ArrowRight size={16} />
            </Link>
          </div>
        </Card>
        <AuthInfoPanel title="Verified identity before account access" />
      </div>
    )
  }

  /* ── Default form state ── */
  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-blue-600">
            <MailCheck size={12} />
            Email verification
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Confirm account ownership
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            Paste the verification token from your email to activate your account.
          </p>
          <div className="mt-5 h-px bg-slate-100" />
        </div>
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