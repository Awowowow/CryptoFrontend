const PageLoader = ({ label = 'Loading...' }) => {
  return (
    <div className="flex min-h-[18rem] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-11">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
        </div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default PageLoader
