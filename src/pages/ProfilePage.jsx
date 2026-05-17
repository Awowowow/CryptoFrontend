import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BadgeCheck, CalendarDays, Mail, ShieldCheck, UserRound } from 'lucide-react'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { fetchProfile } from '../features/profile/profileSlice'
import { formatDateTime } from '@/lib/formatters'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <PageHeader
        description="The verified identity and account status currently stored for your exchange account."
        eyebrow="Profile"
        title="Account profile"
      />

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-slate-950 text-white">
              <UserRound size={24} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-950">{data?.email ?? 'Loading...'}</p>
              <p className="text-sm text-slate-500">{data?.role ?? 'USER'}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ProfileStatus label="KYC" value={<StatusBadge status={data?.kycStatus} />} />
            <ProfileStatus label="2FA" value={data?.isTwoFaEnabled ? 'Enabled' : 'Not enabled'} />
            <ProfileStatus label="Email" value={data?.isEmailVerified ? 'Verified' : 'Not verified'} />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-950">Account details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <DetailRow icon={Mail} label="Email" value={data?.email} />
            <DetailRow icon={BadgeCheck} label="Role" value={data?.role} />
            <DetailRow icon={ShieldCheck} label="Email verified at" value={formatDateTime(data?.emailVerifiedAt)} />
            <DetailRow icon={CalendarDays} label="Created at" value={formatDateTime(data?.createdAt)} />
            <DetailRow icon={CalendarDays} label="Last login" value={formatDateTime(data?.lastLoginAt)} />
            <DetailRow icon={CalendarDays} label="Updated at" value={formatDateTime(data?.updatedAt)} />
          </div>
        </Card>
      </section>
    </div>
  )
}

const ProfileStatus = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-950">{value}</span>
    </div>
  )
}

const DetailRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <Icon className="text-blue-600" size={17} />
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 break-words text-sm font-medium text-slate-950">{value || 'Not available'}</p>
    </div>
  )
}

export default ProfilePage
