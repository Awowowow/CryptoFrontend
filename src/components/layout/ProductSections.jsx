import {
  BadgeCheck,
  BarChart3,
  CreditCard,
  Headphones,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import Card from '../ui/Card'

const assetCards = [
  { name: 'Bitcoin', symbol: 'BTC', status: 'Buy, sell, and trade coming soon' },
  { name: 'Ethereum', symbol: 'ETH', status: 'Buy, sell, and trade coming soon' },
  { name: 'Solana', symbol: 'SOL', status: 'Buy, sell, and trade coming soon' },
]

const fundingMethods = [
  { icon: Landmark, title: 'Bank transfer', text: 'Move funds from your bank account once fiat rails are available.' },
  { icon: CreditCard, title: 'Debit card', text: 'Fast card purchases are planned for the buy crypto flow.' },
  { icon: Wallet, title: 'Crypto deposits', text: 'Deposit addresses and confirmations will appear when crypto wallets launch.' },
]

const trustItems = [
  { icon: ShieldCheck, title: 'Two-factor protection', text: 'Use an authenticator app to protect sign-ins and sensitive account actions.' },
  { icon: BadgeCheck, title: 'Verified accounts', text: 'Email verification is live now, with KYC levels planned for trading eligibility.' },
  { icon: LockKeyhole, title: 'Trusted device control', text: 'Known devices can sign in faster without weakening high-risk action checks.' },
  { icon: Headphones, title: 'Support-ready flows', text: 'Account recovery, alerts, and support pages are planned as the product grows.' },
]

export const PopularAssets = () => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Popular assets</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Markets coming to CryptoEx</h2>
        </div>
        <BarChart3 className="text-slate-500" size={24} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {assetCards.map((asset) => (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={asset.symbol}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-950">{asset.name}</p>
                <p className="text-sm text-slate-500">{asset.symbol}</p>
              </div>
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                Soon
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{asset.status}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export const FundingMethods = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Wallets</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Fund your account your way.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            CryptoEx will bring together bank funding, card purchases, and crypto deposits in one
            wallet experience as funding rails go live.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
        {fundingMethods.map((method) => (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5" key={method.title}>
            <div className="grid size-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <method.icon size={23} />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-950">{method.title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{method.text}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

export const TrustAndSecurity = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-[#08111f] text-white shadow-xl">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Security</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed to protect accounts before funds move.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Security is part of the account foundation: verified access, authenticator checks,
            trusted devices, and step-up protection for sensitive actions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        {trustItems.map((item) => (
          <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/8 p-5" key={item.title}>
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-blue-300">
              <item.icon size={21} />
            </div>
            <div>
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}
