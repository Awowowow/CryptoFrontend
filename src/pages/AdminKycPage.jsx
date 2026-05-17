import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import {
  fetchAdminKycSubmission,
  fetchAdminKycSubmissions,
  reviewAdminKycSubmission,
} from '../features/admin/adminKycSlice'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatDateTime, titleCaseToken } from '@/lib/formatters'

const filterOptions = ['ALL', 'PENDING', 'APPROVED', 'REJECTED']

const AdminKycPage = () => {
  const dispatch = useDispatch()
  const { submissions, selectedSubmission, reviewStatus } = useSelector((state) => state.adminKyc)
  const [filter, setFilter] = useState('PENDING')
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    dispatch(fetchAdminKycSubmissions(filter === 'ALL' ? undefined : filter))
  }, [dispatch, filter])

  const selectedMissingFiles = useMemo(() => {
    const uploadedTypes = selectedSubmission?.documents?.map((document) => document.fileType) ?? []
    return ['ID_FRONT', 'PROOF_OF_ADDRESS'].filter((type) => !uploadedTypes.includes(type))
  }, [selectedSubmission])

  const handleReview = async (status) => {
    await dispatch(
      reviewAdminKycSubmission({
        submissionId: selectedSubmission.id,
        status,
        rejectionReason: status === 'REJECTED' ? rejectionReason : null,
      }),
    ).unwrap()
    await dispatch(fetchAdminKycSubmission(selectedSubmission.id))
    await dispatch(fetchAdminKycSubmissions(filter === 'ALL' ? undefined : filter))
    setRejectionReason('')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        description="Review identity submissions, inspect uploaded files, and record approval or rejection decisions."
        eyebrow="Admin"
        title="KYC review queue"
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-0">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Submissions</h2>
              <p className="text-sm text-slate-500">{submissions.length} result(s)</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {titleCaseToken(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="divide-y divide-slate-100">
            {submissions.map((submission) => (
              <button
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                key={submission.id}
                type="button"
                onClick={() => dispatch(fetchAdminKycSubmission(submission.id))}
              >
                <div>
                  <p className="font-semibold text-slate-950">
                    {submission.legalFirstName} {submission.legalLastName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{submission.user.email}</p>
                </div>
                <StatusBadge status={submission.status} />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          {!selectedSubmission ? (
            <div className="py-16 text-center">
              <h2 className="text-lg font-semibold text-slate-950">Select a submission</h2>
              <p className="mt-2 text-sm text-slate-500">
                Pick a user from the queue to inspect identity details and documents.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    {selectedSubmission.legalFirstName} {selectedSubmission.legalLastName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedSubmission.user.email}</p>
                </div>
                <StatusBadge status={selectedSubmission.status} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField label="Country" value={selectedSubmission.country} />
                <AdminField label="Document type" value={titleCaseToken(selectedSubmission.documentType)} />
                <AdminField label="Submitted" value={formatDateTime(selectedSubmission.submittedAt)} />
                <AdminField label="Reviewed" value={formatDateTime(selectedSubmission.reviewedAt)} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-950">Documents</h3>
                <div className="mt-3 space-y-2">
                  {selectedSubmission.documents.map((document) => (
                    <div className="rounded-xl border border-slate-200 px-4 py-3" key={document.id}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-950">{titleCaseToken(document.fileType)}</span>
                        <span className="text-xs text-slate-500">{document.mimeType}</span>
                      </div>
                      <p className="mt-1 truncate text-sm text-slate-500">{document.fileName}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSubmission.status === 'PENDING' && (
                <div className="space-y-4 border-t border-slate-200 pt-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">Review decision</h3>
                    {selectedMissingFiles.length > 0 && (
                      <p className="mt-2 text-sm text-amber-700">
                        Missing required file(s): {selectedMissingFiles.map(titleCaseToken).join(', ')}
                      </p>
                    )}
                  </div>

                  <Textarea
                    placeholder="Reason required only when rejecting"
                    value={rejectionReason}
                    onChange={(event) => setRejectionReason(event.target.value)}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      disabled={selectedMissingFiles.length > 0 || reviewStatus === 'loading'}
                      variant="primary"
                      onClick={() => handleReview('APPROVED')}
                    >
                      Approve
                    </Button>
                    <Button
                      disabled={!rejectionReason.trim() || reviewStatus === 'loading'}
                      variant="destructive"
                      onClick={() => handleReview('REJECTED')}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-slate-950">Audit trail</h3>
                <div className="mt-3 space-y-2">
                  {selectedSubmission.auditLogs.map((log) => (
                    <div className="rounded-xl border border-slate-200 px-4 py-3" key={log.id}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-950">{titleCaseToken(log.action)}</span>
                        <span className="text-xs text-slate-500">{formatDateTime(log.createdAt)}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {log.actor?.email ?? 'System'} {log.reason ? `- ${log.reason}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  )
}

const AdminField = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-950">{value || 'Not available'}</p>
    </div>
  )
}

export default AdminKycPage
