export const formatDateTime = (value) => {
  if (!value) return 'Not available'

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export const formatAssetAmount = (value, decimals = 8) => {
  const amount = Number(value ?? 0)

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Math.min(decimals, 8),
  }).format(amount)
}

export const formatCurrency = (value, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits,
    style: 'currency',
  }).format(Number(value ?? 0))
}

export const formatCompactCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    notation: 'compact',
    style: 'currency',
  }).format(Number(value ?? 0))
}

export const formatPercentage = (value) => {
  return `${Number(value ?? 0).toFixed(2)}%`
}

export const titleCaseToken = (value) => {
  return String(value ?? '')
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
