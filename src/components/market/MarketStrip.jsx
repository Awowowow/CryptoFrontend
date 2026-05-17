import { TrendingDown, TrendingUp } from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../lib/formatters'

const MarketStrip = ({ assets }) => {
  if (!assets.length) return null

  return (
    <section className="mx-auto grid max-w-[1500px] gap-3 md:grid-cols-2 xl:grid-cols-4">
      {assets.map((asset) => {
        const isPositive = asset.change24hPercent >= 0
        const TrendIcon = isPositive ? TrendingUp : TrendingDown

        return (
          <article
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            key={asset.id}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <img alt="" className="size-9 rounded-full" src={asset.image} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950">{asset.name}</p>
                  <p className="text-xs font-medium text-slate-500">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-950">
                  {formatCurrency(asset.priceUsd, asset.priceUsd < 1 ? 4 : 2)}
                </p>
                <p
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  <TrendIcon size={13} />
                  {formatPercentage(asset.change24hPercent)}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default MarketStrip
