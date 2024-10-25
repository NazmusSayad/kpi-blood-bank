import { cn } from '@/utils'
import { Card } from '@mui/material'
import { AdminUser } from '@/config'
import UserAvatar from '@/components/ui/UserAvatar'
import { convertBloodGroupToNormal } from '@/service/db/utils'

export default function UserCard({ user }: { user: AdminUser }) {
  return (
    <Card className={'px-3 py-2 !bg-red-50'}>
      <div className={'relative isolate'}>
        <div
          className={cn(
            '-z-10 absolute p-2 rounded-full bg-red-200 top-0 right-0 grid place-content-center font-bold text-sm'
          )}
        >
          <div className={'min-w-[3ch] text-center'}>
            {convertBloodGroupToNormal(user.bloodGroup)}
          </div>
        </div>

        <div className={'flex items-center gap-2'}>
          <UserAvatar avatarUrl={user.avatar_url} className={'size-12'} />

          <div>
            <p className={'font-medium'}>{user.name}</p>
            <p className={'font-rubik text-gray-500 text-sm'}>@{user.id}</p>
          </div>
        </div>

        <div className={'mt-2'}>
          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Role:</span> {user.role}
          </p>

          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Phone:</span>{' '}
            <a href={'tel:' + user.phone}>{user.phone}</a>
          </p>

          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Email:</span> {user.email}
          </p>

          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>NID:</span> {user.nidNumber}
          </p>

          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Birth Certificate:</span> {user.birthCertificateNumber}
          </p>
        </div>
      </div>
    </Card>
  )
}
