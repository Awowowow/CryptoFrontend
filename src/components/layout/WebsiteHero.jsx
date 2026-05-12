import { ArrowRight, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'

const liveCapabilities = [
  { icon: ShieldCheck, label: 'Email verified access' },
  { icon: Smartphone, label: 'Authenticator-based login' },
  { icon: LockKeyhole, label: 'Step-up protection' },
]

const WebsiteHero = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
        <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            Secure accounts live
          </div>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Buy, sell, and trade crypto on a security-first exchange.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Create an account, secure it with authenticator 2FA, and prepare for verified funding,
            wallet, and trading as new exchange features open.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              to="/auth/signup"
            >
              Create account
              <ArrowRight size={18} />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              to="/auth/login"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {liveCapabilities.map((item) => (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.label}>
                <item.icon className="text-blue-600" size={22} />
                <p className="mt-3 text-sm font-semibold text-slate-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 bg-[#0b111f] p-6 text-white lg:border-l lg:border-t-0 lg:p-8">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium text-slate-300">Security status</p>
                <p className="mt-1 text-2xl font-semibold">Protected session</p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                Live
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ['Account access', 'Email verified'],
                ['Login security', 'Authenticator 2FA'],
                ['Known devices', 'Trusted for login'],
                ['Sensitive actions', 'Fresh 2FA required'],
              ].map(([label, value]) => (
                <div className="flex items-center justify-between rounded-xl bg-white/8 px-4 py-3" key={label}>
                  <span className="text-sm text-slate-300">{label}</span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebsiteHero
