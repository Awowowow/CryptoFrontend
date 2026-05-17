import { Badge } from '@/components/ui/badge'
import { titleCaseToken } from '@/lib/formatters'

const toneByStatus = {
  APPROVED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  PENDING: 'border-amber-200 bg-amber-50 text-amber-700',
  REJECTED: 'border-rose-200 bg-rose-50 text-rose-700',
  NOT_SUBMITTED: 'border-slate-200 bg-slate-100 text-slate-700',
}

const StatusBadge = ({ status }) => {
  return (
    <Badge className={toneByStatus[status] ?? toneByStatus.NOT_SUBMITTED} variant="outline">
      {titleCaseToken(status || 'NOT_SUBMITTED')}
    </Badge>
  )
}

export default StatusBadge
