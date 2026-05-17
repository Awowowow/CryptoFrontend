import { formatCompactCurrency, formatCurrency, formatPercentage } from '../../lib/formatters'

const MarketTable = ({
  assets,
  compact = false,
  onAssetSelect,
  selectedAssetId,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Asset</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">24h</th>
              {!compact && <th className="px-5 py-3">Market cap</th>}
              {!compact && <th className="px-5 py-3">Volume</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((asset) => {
              const isPositive = asset.change24hPercent >= 0

              return (
                <tr
                  className={`text-sm transition ${
                    onAssetSelect ? 'cursor-pointer hover:bg-slate-50' : ''
                  } ${selectedAssetId === asset.id ? 'bg-blue-50/70' : ''}`}
                  key={asset.id}
                  onClick={onAssetSelect ? () => onAssetSelect(asset.id) : undefined}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img alt="" className="size-9 rounded-full" src={asset.image} />
                      <div>
                        <p className="font-semibold text-slate-950">{asset.name}</p>
                        <p className="text-xs font-medium text-slate-500">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-950">
                    {formatCurrency(asset.priceUsd, asset.priceUsd < 1 ? 4 : 2)}
                  </td>
                  <td
                    className={`px-5 py-4 font-semibold ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {formatPercentage(asset.change24hPercent)}
                  </td>
                  {!compact && (
                    <td className="px-5 py-4 text-slate-600">
                      {formatCompactCurrency(asset.marketCapUsd)}
                    </td>
                  )}
                  {!compact && (
                    <td className="px-5 py-4 text-slate-600">
                      {formatCompactCurrency(asset.volume24hUsd)}
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MarketTable
