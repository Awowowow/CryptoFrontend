import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../features/auth/authSlice'

const Alert = () => {
  const dispatch = useDispatch()
  const { error, message } = useSelector((state) => state.auth)

  if (!error && !message) return null

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${
        error
          ? 'border-rose-200 bg-rose-50 text-rose-800'
          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      <span>{error || message}</span>
      <button
        className="font-semibold text-slate-700"
        type="button"
        onClick={() => dispatch(clearMessage())}
      >
        Dismiss
      </button>
    </div>
  )
}

export default Alert
