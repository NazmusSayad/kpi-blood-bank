import { cn } from '@/utils'
import { useState } from 'react'
import { AdminUser } from '@/config'
import { FaCheck } from 'react-icons/fa6'
import { UserRole } from '@prisma/client'
import { Card, IconButton } from '@mui/material'
import UserAvatar from '@/components/ui/UserAvatar'
import BetterSelect from '@/components/ui/BetterSelect'
import { convertBloodGroupToNormal } from '@/service/db/utils'

export function UserDetails({ user, includeRole }: { user?: AdminUser; includeRole?: boolean }) {
  return (
    <>
      <div className={'flex items-center gap-2'}>
        <UserAvatar avatarUrl={user?.avatar_url} className={'size-12'} />

        <div>
          <p className={'font-medium'}>{user?.name}</p>
          <p className={'font-rubik text-gray-500 text-sm'}>@{user?.id}</p>
        </div>
      </div>

      <div className={'mt-2'}>
        {includeRole && (
          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Role:</span> {user?.role}
          </p>
        )}

        <p className={'text-sm text-gray-500'}>
          <span className={'font-medium'}>Phone:</span>{' '}
          <a href={'tel:' + user?.phone}>{user?.phone}</a>
        </p>

        <p className={'text-sm text-gray-500'}>
          <span className={'font-medium'}>Email:</span> {user?.email}
        </p>

        <p className={'text-sm text-gray-500'}>
          <span className={'font-medium'}>NID:</span> {user?.nidNumber}
        </p>

        <p className={'text-sm text-gray-500'}>
          <span className={'font-medium'}>Birth Certificate:</span> {user?.bcNumber}
        </p>
      </div>
    </>
  )
}

export default function UserCard({ user }: { user: AdminUser }) {
  const [role, setRole] = useState(user.role)
  console.log(role)

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

        <UserDetails user={user} />

        <div className={'flex items-center gap-2 mt-3'}>
          {/* <Select
            fullWidth
            size={'small'}
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            {Object.keys(UserRole).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select> */}

          <BetterSelect
            fullWidth
            required={false}
            label={'Role'}
            size={'small'}
            value={role}
            items={Object.keys(UserRole).map((role) => ({ label: role, value: role }))}
            onChange={(e) => setRole(e.target.value as any)}
          />

          <IconButton className={'!bg-sky-200/40'}>
            <FaCheck />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}
