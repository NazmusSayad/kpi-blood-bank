'use client'

import Header from './Header'
import UserCard from './UserCard'
import { useApi } from '@/api/http'
import { AdminUser } from '@/config'
import { BloodGroup } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'
import { cn } from '@/utils'

export default function UserPage() {
  const api = useApi()
  const [signal] = useAbortSignal()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('')

  useEffect(() => {
    async function fetchUsers() {
      const { ok, data } = await api.get<AdminUser[]>(
        `/users/admin?search=${searchValue}&bloodGroup=${bloodGroup}`,
        { signal: signal() }
      )

      if (!ok) return
      setUsers(data)
    }

    const timeout = setTimeout(fetchUsers, 300)
    return () => clearTimeout(timeout)
  }, [searchValue, bloodGroup])

  return (
    <div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}>
        <BloodGroupSelect
          fullWidth
          required={false}
          value={bloodGroup}
          setValue={setBloodGroup}
        />
      </Header>

      <div
        className={cn(
          'grid gap-3 content-center mb-12',
          'grid-cols-[repeat(auto-fit,minmax(auto,1fr))]',
          'xs:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]'
        )}
      >
        {users.map((user) => (
          <div>
            <div className={'max-w-[28rem] mx-auto'}>
              <UserCard key={user.id} user={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
