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
    <Card>
      <p className="text-sm font-semibold uppercase text-blue-600">Ways to fund</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">Choose how you move money</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {fundingMethods.map((method) => (
          <div className="rounded-xl border border-slate-200 bg-white p-4" key={method.title}>
            <method.icon className="text-blue-600" size={23} />
            <p className="mt-4 font-semibold text-slate-950">{method.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{method.text}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export const TrustAndSecurity = () => {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase text-emerald-600">Security</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">Designed to protect accounts before funds move</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {trustItems.map((item) => (
          <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.title}>
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-blue-600">
              <item.icon size={21} />
            </div>
            <div>
              <p className="font-semibold text-slate-950">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
