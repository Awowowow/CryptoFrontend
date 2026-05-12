import { ArrowRight, BarChart3, CheckCircle2, CreditCard, Landmark, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FundingMethods, PopularAssets, TrustAndSecurity } from '../components/layout/ProductSections'
import Card from '../components/ui/Card'

const proofPoints = [
  'Email-verified account creation',
  'Authenticator protection for new devices',
  'Trusted devices for faster sign-in',
  'Fresh verification for sensitive actions',
]

const LandingPage = () => {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-[#0b111f] text-white shadow-sm">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
          <div className="px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-semibold text-blue-100">
              CryptoEx exchange
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              Buy, sell, and trade crypto with security built in from day one.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Create an account, secure it with authenticator protection, and get ready for simple
              crypto buying, selling, funding, and trading flows as markets open.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                to="/auth/signup"
              >
                Create account
                <ArrowRight size={18} />
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                to="/overview"
              >
                Explore the exchange
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-6 lg:border-l lg:border-t-0 lg:p-10">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-300">Buy crypto</p>
                  <p className="text-2xl font-semibold">Start with popular assets</p>
                </div>
                <div className="grid size-12 place-items-center rounded-xl bg-blue-500 text-white">
                  <CreditCard size={24} />
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Choose asset</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {['BTC', 'ETH', 'SOL'].map((asset) => (
                    <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-3 text-center" key={asset}>
                      <p className="text-sm font-semibold">{asset}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ['Bank transfer', Landmark],
                  ['Debit card', CreditCard],
                ].map(([label, Icon]) => (
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3" key={label}>
                    <Icon className="text-blue-200" size={18} />
                    <span className="text-sm font-medium text-slate-100">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="grid gap-3">
                  {proofPoints.slice(1, 4).map((point) => (
                    <div className="flex items-center gap-3" key={point}>
                      <CheckCircle2 className="text-emerald-300" size={18} />
                      <span className="text-sm font-medium text-slate-100">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <FeatureCard
          icon={CreditCard}
          title="Buy crypto"
          text="Prepare your account for simple purchase flows with card and bank funding options."
        />
        <FeatureCard
          icon={BarChart3}
          title="Trade markets"
          text="BTC, ETH, and SOL markets are planned with clean account and trading eligibility flows."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Secure account"
          text="Protect sign-ins with email verification, authenticator checks, and trusted devices."
        />
      </section>

      <PopularAssets />
      <FundingMethods />
      <TrustAndSecurity />
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, text }) => {
  return (
    <Card>
      <Icon className="text-blue-600" size={24} />
      <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Card>
  )
}

export default LandingPage
