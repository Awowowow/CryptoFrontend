import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Coins, Lock, Wallet } from 'lucide-react'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'
import { fetchWalletBalances } from '../features/wallet/walletSlice'
import { formatAssetAmount } from '@/lib/formatters'
import { Skeleton } from '@/components/ui/skeleton'

const WalletsPage = () => {
  const dispatch = useDispatch()
  const { balances, status } = useSelector((state) => state.wallet)

  useEffect(() => {
    dispatch(fetchWalletBalances())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <PageHeader
        description="Track available funds, locked funds, and total balances for every active asset in your exchange wallet."
        eyebrow="Wallets"
        title="Balances"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <WalletMetric icon={Coins} label="Assets" value={String(balances.length)} />
        <WalletMetric
          icon={Wallet}
          label="Available accounts"
          value={String(balances.length)}
        />
        <WalletMetric icon={Lock} label="Locked buckets" value={String(balances.length)} />
      </section>

      <Card className="p-0">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">Asset balances</h2>
          <p className="text-sm text-slate-500">
            Each asset has its own available and locked balance, exactly like the backend ledger model.
          </p>
        </div>

        {status === 'loading' ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <Skeleton className="h-16 w-full" key={item} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {balances.map((balance) => (
              <div className="grid gap-4 px-5 py-4 md:grid-cols-[1.2fr_1fr_1fr_1fr]" key={balance.asset.id}>
                <div>
                  <p className="font-semibold text-slate-950">{balance.asset.name}</p>
                  <p className="text-sm text-slate-500">{balance.asset.symbol}</p>
                </div>
                <BalanceCell label="Available" value={formatAssetAmount(balance.available, balance.asset.decimals)} />
                <BalanceCell label="Locked" value={formatAssetAmount(balance.locked, balance.asset.decimals)} />
                <BalanceCell label="Total" value={formatAssetAmount(balance.total, balance.asset.decimals)} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

const WalletMetric = ({ icon: Icon, label, value }) => {
  return (
    <Card>
      <Icon className="text-blue-600" size={18} />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
    </Card>
  )
}

const BalanceCell = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-slate-950">{value}</p>
    </div>
  )
}

export default WalletsPage
