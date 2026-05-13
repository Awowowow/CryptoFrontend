import { Link } from 'react-router-dom'
import logo from '../../assets/cryptoex-logo.png'

const sizeClasses = {
  sm: 'size-12',
  md: 'size-14',
  lg: 'size-16',
}

const BrandLogo = ({
  className = '',
  size = 'md',
  subtitle = 'Buy, sell, trade',
  textTone = 'dark',
  to = '/',
}) => {
  const isLight = textTone === 'light'

  return (
    <Link className={`flex items-center gap-3 rounded-2xl px-1.5 py-1 transition ${className}`} to={to}>
      <img
        alt="CryptoEx logo"
        className={`${sizeClasses[size]} shrink-0 rounded-2xl object-cover shadow-lg shadow-slate-950/15`}
        src={logo}
      />
      <div className="leading-tight">
        <p className={`text-lg font-semibold ${isLight ? 'text-white' : 'text-slate-950'}`}>CryptoEx</p>
        <p className={`hidden text-xs font-medium sm:block ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      </div>
    </Link>
  )
}

export default BrandLogo
