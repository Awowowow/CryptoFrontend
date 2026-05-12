const Button = ({
  children,
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  variant = 'primary',
  ...props
}) => {
  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100',
    secondary:
      'border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-100',
    dark: 'bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-200',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  )
}

export default Button
