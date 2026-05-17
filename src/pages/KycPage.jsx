import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FileUp, IdCard, ShieldCheck } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import PageHeader from '../components/layout/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { fetchKycStatus, submitKyc, uploadKycDocument } from '../features/kyc/kycSlice'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDateTime, titleCaseToken } from '@/lib/formatters'
import PageLoader from '../components/ui/PageLoader'

const documentTypes = ['PASSPORT', 'NATIONAL_ID', 'DRIVING_LICENSE']
const uploadTypes = ['ID_FRONT', 'ID_BACK', 'PROOF_OF_ADDRESS', 'SELFIE']

const emptyForm = {
  legalFirstName: '',
  legalLastName: '',
  dateOfBirth: '',
  country: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  documentType: 'PASSPORT',
  documentNumber: '',
}

const KycPage = () => {
  const dispatch = useDispatch()
  const { actionStatus, error, status, statusData } = useSelector((state) => state.kyc)
  const [form, setForm] = useState(emptyForm)
  const [fileType, setFileType] = useState('ID_FRONT')
  const [file, setFile] = useState(null)

  useEffect(() => {
    dispatch(fetchKycStatus())
  }, [dispatch])

  const latestSubmission = statusData?.latestSubmission
  const canSubmit = !latestSubmission || statusData?.status === 'REJECTED'
  const canUpload = statusData?.status === 'PENDING'

  if (status === 'loading' && !statusData) {
    return <PageLoader label="Loading verification center..." />
  }

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(submitKyc(form)).unwrap()
      await dispatch(fetchKycStatus())
    } catch {
      // The slice stores the backend error so the page can show it to the user.
    }
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    if (!file) return

    try {
      await dispatch(uploadKycDocument({ file, fileType })).unwrap()
      setFile(null)
      await dispatch(fetchKycStatus())
    } catch {
      // The slice stores the backend error so the page can show it to the user.
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        description="Submit identity details, upload required documents, and track the review status that unlocks regulated exchange activity."
        eyebrow="Verification"
        title="KYC center"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <KycMetric icon={ShieldCheck} label="Current status" value={<StatusBadge status={statusData?.status} />} />
        <KycMetric
          icon={IdCard}
          label="Required documents"
          value={String(statusData?.requiredFileTypes?.length ?? 0)}
        />
        <KycMetric
          icon={FileUp}
          label="Missing documents"
          value={String(statusData?.missingRequiredFileTypes?.length ?? 0)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <h2 className="text-lg font-semibold text-slate-950">
            {canSubmit ? 'Submit verification details' : 'Latest submission'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {canSubmit
              ? 'Use your legal identity details exactly as they appear on your document.'
              : 'A pending or approved submission cannot be replaced from the user side.'}
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}

          {canSubmit ? (
            <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <Input label="Legal first name" name="legalFirstName" value={form.legalFirstName} onChange={handleChange} />
              <Input label="Legal last name" name="legalLastName" value={form.legalLastName} onChange={handleChange} />
              <Input label="Date of birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
              <Input label="Country" name="country" value={form.country} onChange={handleChange} />
              <Input label="Address line 1" name="addressLine1" value={form.addressLine1} onChange={handleChange} />
              <Input label="Address line 2" name="addressLine2" value={form.addressLine2} onChange={handleChange} />
              <Input label="City" name="city" value={form.city} onChange={handleChange} />
              <Input label="Postal code" name="postalCode" value={form.postalCode} onChange={handleChange} />

              <div className="space-y-2">
                <Label>Document type</Label>
                <Select
                  value={form.documentType}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, documentType: value }))
                  }
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {titleCaseToken(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Input label="Document number" name="documentNumber" value={form.documentNumber} onChange={handleChange} />

              <Button className="h-12 md:col-span-2" disabled={actionStatus === 'loading'} type="submit" variant="primary">
                Submit KYC
              </Button>
            </form>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ReadOnlyField label="Name" value={`${latestSubmission?.legalFirstName ?? ''} ${latestSubmission?.legalLastName ?? ''}`.trim()} />
              <ReadOnlyField label="Country" value={latestSubmission?.country} />
              <ReadOnlyField label="Document type" value={titleCaseToken(latestSubmission?.documentType)} />
              <ReadOnlyField label="Submitted at" value={formatDateTime(latestSubmission?.submittedAt)} />
              {latestSubmission?.rejectionReason && (
                <ReadOnlyField label="Rejection reason" value={latestSubmission.rejectionReason} />
              )}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-950">Document upload</h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload JPEG, PNG, or PDF files for the current pending submission.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleUpload}>
              <div className="space-y-2">
                <Label>Document slot</Label>
                <Select value={fileType} onValueChange={setFileType}>
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {uploadTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {titleCaseToken(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="block rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <span className="block text-sm font-semibold text-slate-700">Choose file</span>
                <input
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="mt-3 block w-full text-sm text-slate-500"
                  type="file"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </label>

              <Button className="h-11 w-full" disabled={!canUpload || !file || actionStatus === 'loading'} type="submit">
                Upload document
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-950">Uploaded documents</h2>
            <div className="mt-4 space-y-3">
              {(latestSubmission?.documents ?? []).map((document) => (
                <div className="rounded-xl border border-slate-200 px-4 py-3" key={document.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">{titleCaseToken(document.fileType)}</p>
                    <span className="text-xs text-slate-500">{document.mimeType}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-500">{document.fileName}</p>
                </div>
              ))}

              {!latestSubmission?.documents?.length && (
                <p className="text-sm text-slate-500">No documents uploaded yet.</p>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

const KycMetric = ({ icon: Icon, label, value }) => {
  return (
    <Card>
      <Icon className="text-blue-600" size={18} />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
    </Card>
  )
}

const ReadOnlyField = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-950">{value || 'Not available'}</p>
    </div>
  )
}

export default KycPage
