import { CheckCircle2, ShieldCheck } from 'lucide-react'
import Card from '../../../components/ui/Card'

const points = [
  'Protected browser sessions',
  'Email verification before login',
  'Authenticator check for untrusted devices',
  'Step-up 2FA for high-risk actions',
]

const AuthInfoPanel = ({ title = 'Exchange-grade account security' }) => {
  return (
    <Card className="relative overflow-hidden border-slate-800 bg-[#080f1c] text-white">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
          <ShieldCheck size={20} />
          {/* Pulsing dot */}
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-[#080f1c] bg-emerald-400" />
        </div>
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-blue-400/80">
            Security layer
          </p>
          <h2 className="mt-0.5 text-lg font-semibold leading-tight text-white">{title}</h2>
        </div>
      </div>

      <div className="relative mt-6 space-y-2">
        {points.map((point) => (
          <div
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.07]"
            key={point}
          >
            <CheckCircle2 className="shrink-0 text-emerald-400" size={15} />
            <span className="text-sm font-medium text-slate-300">{point}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default AuthInfoPanel