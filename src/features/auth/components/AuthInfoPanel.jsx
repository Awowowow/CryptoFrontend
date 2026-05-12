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
    <Card className="bg-[#0b111f] text-white">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-blue-500">
          <ShieldCheck size={22} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-blue-200">Security layer</p>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {points.map((point) => (
          <div className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3" key={point}>
            <CheckCircle2 className="text-emerald-300" size={18} />
            <span className="text-sm font-medium text-slate-100">{point}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default AuthInfoPanel
