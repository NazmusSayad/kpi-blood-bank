import { cn } from '@/utils'
import { useApi } from '@/api/http'
import { AdminUser } from '@/config'
import { memo, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { Button, Card } from '@mui/material'
import UserAvatar from '@/components/ui/UserAvatar'
import BetterSelect from '@/components/ui/BetterSelect'
import { convertBloodGroupToNormal } from '@/service/db/utils'
import { AccountType, BloodGroup, UserRole } from '@prisma/client'

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

function UserCard({ user, isSuperAdmin }: { user: AdminUser; isSuperAdmin: boolean }) {
  const api = useApi()

  const [role, setRole] = useState(user.role)
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup)
  const [accountType, setAccountType] = useState(user.accountType)

  async function handleRoleUpdate() {
    const { data, ok } = await api.patch(`/account/${user.id}/manage`, {
      role,
      bloodGroup,
      accountType,
    })

    if (!ok) return
    console.log(data)
  }

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

        <div className={'grid gap-3 mt-4'}>
          {isSuperAdmin && (
            <BetterSelect
              fullWidth
              value={role}
              size={'small'}
              label={'Role'}
              required={false}
              items={Object.keys(UserRole).map((role) => ({ label: role, value: role }))}
              onChange={(e) => setRole(e.target.value as any)}
            />
          )}

          <BetterSelect
            fullWidth
            size={'small'}
            required={false}
            value={bloodGroup}
            label={'Blood Group'}
            items={Object.keys(BloodGroup).map((role) => ({ label: role, value: role }))}
            onChange={(e) => setBloodGroup(e.target.value as any)}
          />

          <BetterSelect
            fullWidth
            value={accountType}
            size={'small'}
            label={'Account Type'}
            required={false}
            items={Object.keys(AccountType).map((role) => ({ label: role, value: role }))}
            onChange={(e) => setAccountType(e.target.value as any)}
          />

          <Button
            variant={'outlined'}
            disabled={api.loading}
            startIcon={<FaCheck />}
            onClick={handleRoleUpdate}
          >
            Save
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default memo(UserCard)
