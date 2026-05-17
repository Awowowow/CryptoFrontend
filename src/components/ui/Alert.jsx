import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../features/auth/authSlice'
import { clearAdminKycFeedback } from '../../features/admin/adminKycSlice'
import { clearKycFeedback } from '../../features/kyc/kycSlice'

const Alert = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const kyc = useSelector((state) => state.kyc)
  const adminKyc = useSelector((state) => state.adminKyc)

  const feedback = [
    { error: auth.error, message: auth.message, clear: clearMessage },
    { error: kyc.error, message: kyc.message, clear: clearKycFeedback },
    { error: adminKyc.error, message: adminKyc.message, clear: clearAdminKycFeedback },
  ].find((item) => item.error || item.message)

  if (!feedback) return null

  const isError = Boolean(feedback.error)

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${
        isError
          ? 'border-rose-200 bg-rose-50 text-rose-800'
          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      <span>{feedback.error || feedback.message}</span>
      <button
        className="font-semibold text-slate-700"
        type="button"
        onClick={() => dispatch(feedback.clear())}
      >
        Dismiss
      </button>
    </div>
  )
}

export default Alert
