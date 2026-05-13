import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Landmark,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FundingMethods, PopularAssets, TrustAndSecurity } from '../components/layout/ProductSections'
import BrandLogo from '../components/ui/BrandLogo'
import Card from '../components/ui/Card'

const proofPoints = [
  'Authenticator protection for new devices',
  'Trusted devices for faster sign-in',
  'Fresh verification for sensitive actions',
]

const navItems = [
  { id: 'exchange', label: 'Exchange' },
  { id: 'wallets', label: 'Wallets' },
  { id: 'security', label: 'Security' },
]

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('exchange')

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = navItems.findLast((item) => {
        const element = document.getElementById(item.id)
        if (!element) return false

        return element.getBoundingClientRect().top <= 140
      })

      setActiveSection(currentSection?.id ?? 'exchange')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-2xl border border-white/80 bg-white/85 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <BrandLogo className="hover:bg-slate-100/70" size="lg" />

          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm font-semibold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                className={`rounded-full px-4 py-2 transition-all duration-300 ease-out ${
                  activeSection === item.id
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'hover:bg-white hover:text-slate-950 hover:shadow-sm'
                }`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              to="/auth/login"
            >
              Sign in
            </Link>
            <Link
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              to="/auth/signup"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <HeroSection />
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 pb-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-3">
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
        <div id="wallets" className="scroll-mt-28">
          <FundingMethods />
        </div>
        <div id="security" className="scroll-mt-28">
          <TrustAndSecurity />
        </div>
      </div>
    </main>
  )
}

const HeroSection = () => {
  return (
    <section
      id="exchange"
      className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] border border-slate-800 shadow-2xl"
      style={{ background: 'linear-gradient(135deg, #07101f 0%, #0b1628 50%, #0d1a30 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1.04fr_0.96fr]">
        <div className="px-8 py-12 sm:px-10 lg:px-14 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_2px_rgba(96,165,250,0.6)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              CryptoEx Exchange
            </span>
          </div>

          <h1 className="mt-7 max-w-xl text-[2.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-[3.5rem]">
            Buy, sell, and trade crypto with security{' '}
            <span className="text-blue-400">built in</span> from day one.
          </h1>

          <p className="mt-5 max-w-lg text-[0.9375rem] leading-7 text-slate-400">
            Create an account, secure it with authenticator protection, and get ready for simple
            crypto buying, selling, funding, and trading flows as markets open.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 hover:shadow-blue-800/50 active:scale-[0.98]"
              to="/auth/signup"
            >
              Create account
              <ArrowRight size={16} />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
              to="/overview"
            >
              Explore the exchange
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.07] bg-white/[0.025] p-6 lg:border-l lg:border-t-0 lg:p-10">
          <HeroTradeCard />
        </div>
      </div>
    </section>
  )
}

const HeroTradeCard = () => {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Buy crypto</p>
          <p className="mt-1 text-xl font-semibold text-white">Start with popular assets</p>
        </div>
        <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-900/40">
          <CreditCard size={20} />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/20 p-4">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate-500">
          Choose asset
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['BTC', 'ETH', 'SOL'].map((asset, index) => (
            <div
              className={`rounded-lg border px-3 py-3 text-center transition cursor-default ${
                index === 0
                  ? 'border-blue-500/40 bg-blue-500/15 shadow-sm shadow-blue-900/30'
                  : 'border-white/[0.08] bg-white/[0.05] hover:bg-white/10'
              }`}
              key={asset}
            >
              <p className="text-sm font-bold tracking-wide text-white">{asset}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {[
          ['Bank transfer', Landmark],
          ['Debit card', CreditCard],
        ].map(([label, Icon]) => (
          <div
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3"
            key={label}
          >
            <Icon className="shrink-0 text-blue-300" size={16} />
            <span className="text-sm font-medium text-slate-200">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
        {proofPoints.map((point) => (
          <div className="flex items-center gap-3" key={point}>
            <CheckCircle2 className="shrink-0 text-emerald-400" size={15} />
            <span className="text-sm text-slate-300">{point}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, text }) => {
  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="inline-grid size-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1.5 text-sm leading-6 text-slate-500">{text}</p>
    </Card>
  )
}

export default LandingPage
