'use client'

import Header from './Header'
import Content from './Content'
import UserCard from './UserCard'
import { useApi } from '@/api/http'
import { AdminUser } from '@/config'
import { BloodGroup } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import { userHasAccess } from '@/service/utils'
import useUserStore from '@/zustand/useUserStore'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'

export default function UserPage() {
  const api = useApi()
  const [signal] = useAbortSignal()
  const currentUser = useUserStore((state) => state.user)

  const [users, setUsers] = useState<AdminUser[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('')
  const isSuperAdmin = !!currentUser && userHasAccess(currentUser).superAdmin

  async function fetchUsers(
    searchQuery: string,
    bloodQuery: BloodGroup | '',
    cursor: number | string = ''
  ) {
    const { ok, data } = await api.get<{ users: AdminUser[]; total: number }>(
      `/users/manage?limit=24&search=${encodeURIComponent(searchQuery)}&bloodGroup=${bloodQuery}&cursor=${cursor}`,
      { signal: signal() }
    )

    if (!ok) return
    return data.users
  }

  useEffect(() => {
    async function loadInitialUsers() {
      const users = await fetchUsers(searchValue, bloodGroup)
      users && setUsers(users.filter((user) => user.id !== currentUser?.id))
    }

    const timeout = setTimeout(loadInitialUsers, 300)
    return () => clearTimeout(timeout)
  }, [searchValue, bloodGroup])

  return (
    <div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}>
        <BloodGroupSelect fullWidth required={false} value={bloodGroup} setValue={setBloodGroup} />
      </Header>

      <Content
        isLoading={api.loading}
        items={users.map((user) => (
          <UserCard key={user.id} user={user} isSuperAdmin={isSuperAdmin} />
        ))}
        loadMore={async () => {
          const newUsers = await fetchUsers(searchValue, bloodGroup, users[users.length - 1].id)
          newUsers && setUsers((prev) => [...prev, ...newUsers])
        }}
      />
    </div>
  )
}
