import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchWalletBalances } from '../features/wallet/walletSlice'
import { fetchKycStatus } from '../features/kyc/kycSlice'
import { fetchMarketOverview } from '../features/market/marketSlice'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import MarketTable from '../components/market/MarketTable'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  formatAssetAmount,
  formatCompactCurrency,
  formatCurrency,
  formatPercentage,
} from '@/lib/formatters'

const ExchangePage = () => {
  const dispatch = useDispatch()
  const { user, recentTwoFaVerified } = useSelector((state) => state.auth)
  const { balances } = useSelector((state) => state.wallet)
  const { status: walletStatus } = useSelector((state) => state.wallet)
  const { statusData } = useSelector((state) => state.kyc)
  const { assets, status: marketStatus } = useSelector((state) => state.market)
  const [selectedAssetId, setSelectedAssetId] = useState('')

  useEffect(() => {
    dispatch(fetchWalletBalances())
    dispatch(fetchKycStatus())
    dispatch(fetchMarketOverview())

    const intervalId = window.setInterval(() => {
      dispatch(fetchMarketOverview())
    }, 15 * 1000)

    return () => window.clearInterval(intervalId)
  }, [dispatch])

  const balancePreview = balances.slice(0, 3)
  const selectedAsset = useMemo(
    () => assets.find((asset) => asset.id === selectedAssetId) ?? assets[0],
    [assets, selectedAssetId],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        description="Track live crypto markets, inspect assets, and keep your account ready for funding and trading."
        eyebrow="Exchange"
        title={`Markets${user?.email ? ` for ${user.email.split('@')[0]}` : ''}`}
      />

      <section className="grid gap-4 lg:grid-cols-4">
        <SummaryCard
          icon={BarChart3}
          label="Listed markets"
          value={String(assets.length)}
          detail="Live assets from the market feed"
        />
        <SummaryCard
          icon={Wallet}
          label="Wallet assets"
          value={String(balances.length)}
          detail="Assets available in your account"
        />
        <SummaryCard
          icon={BadgeCheck}
          label="KYC status"
          value={<StatusBadge status={statusData?.status} />}
          detail="Needed before regulated actions"
        />
        <SummaryCard
          icon={ShieldCheck}
          label="Step-up 2FA"
          value={recentTwoFaVerified ? 'Fresh' : 'Required'}
          detail="Used before sensitive actions"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_22rem]">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Markets</p>
            <div className="mt-1 flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-slate-950">Live crypto prices</h2>
              {marketStatus === 'refreshing' && (
                <span className="text-xs font-medium text-slate-400">Updating...</span>
              )}
            </div>
          </div>

          {marketStatus === 'loading' && !assets.length ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton className="h-16 w-full" key={item} />
              ))}
            </div>
          ) : (
            <MarketTable
              assets={assets}
              onAssetSelect={setSelectedAssetId}
              selectedAssetId={selectedAsset?.id}
            />
          )}
        </div>

        <div className="space-y-6">
          <AssetDetailCard asset={selectedAsset} />

          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Wallet snapshot</h2>
                <p className="text-sm text-slate-500">Your current balances</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/wallets">
                  <span className="inline-flex items-center gap-1.5">
                    View wallets
                    <ArrowRight />
                  </span>
                </Link>
              </Button>
            </div>

            {walletStatus === 'loading' ? (
              <div className="space-y-3 p-5">
                {[1, 2, 3].map((item) => (
                  <Skeleton className="h-16 w-full" key={item} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {balancePreview.map((balance) => (
                  <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4" key={balance.asset.id}>
                    <div>
                      <p className="font-semibold text-slate-950">{balance.asset.name}</p>
                      <p className="text-sm text-slate-500">{balance.asset.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-950">
                        {formatAssetAmount(balance.total, balance.asset.decimals)}
                      </p>
                      <p className="text-sm text-slate-500">Total balance</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  )
}

const SummaryCard = ({ detail, icon: Icon, label, value }) => {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <div className="mt-3 text-2xl font-semibold text-slate-950">{value}</div>
          <p className="mt-2 text-sm text-slate-500">{detail}</p>
        </div>
        <div className="grid size-11 place-items-center rounded-xl bg-slate-950 text-white">
          <Icon size={18} />
        </div>
      </div>
    </Card>
  )
}

const AssetDetailCard = ({ asset }) => {
  if (!asset) {
    return (
      <Card>
        <Skeleton className="h-64 w-full" />
      </Card>
    )
  }

  const isPositive = asset.change24hPercent >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img alt="" className="size-11 rounded-full" src={asset.image} />
          <div>
            <p className="text-lg font-semibold text-slate-950">{asset.name}</p>
            <p className="text-sm font-medium text-slate-500">{asset.symbol}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          <TrendIcon size={13} />
          {formatPercentage(asset.change24hPercent)}
        </span>
      </div>

      <p className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
        {formatCurrency(asset.priceUsd, asset.priceUsd < 1 ? 4 : 2)}
      </p>

      <div className="mt-6 grid gap-3">
        <DetailRow label="Market cap" value={formatCompactCurrency(asset.marketCapUsd)} />
        <DetailRow label="24h volume" value={formatCompactCurrency(asset.volume24hUsd)} />
        <DetailRow label="24h high" value={formatCurrency(asset.high24hUsd, asset.high24hUsd < 1 ? 4 : 2)} />
        <DetailRow label="24h low" value={formatCurrency(asset.low24hUsd, asset.low24hUsd < 1 ? 4 : 2)} />
        <DetailRow label="Market rank" value={`#${asset.marketCapRank}`} />
      </div>
    </Card>
  )
}

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-950">{value}</span>
    </div>
  )
}

export default ExchangePage
