'use client'

import { useApi } from '@/api/http'
import { PublicUser } from '@/config'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import { Autocomplete, TextField } from '@mui/material'

export default function UserSearchInput() {
  const api = useApi()
  const [signal] = useAbortSignal()
  const [options, setOptions] = useState<PublicUser[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null)

  useEffect(() => {
    if (!searchValue) return setOptions([])

    async function fetchUsers() {
      const { data, ok } = await api.get<{ users: PublicUser[] }>(
        `/users/?limit=10&id=${searchValue}&name=${searchValue}`,
        { signal: signal() }
      )

      if (!ok) return
      setOptions(data.users)
    }

    const timeout = setTimeout(fetchUsers, 300)
    return () => clearTimeout(timeout)
  }, [searchValue])

  return (
    <Autocomplete
      clearOnBlur={false}
      clearOnEscape={false}
      value={selectedUser}
      onChange={(_, newValue) => setSelectedUser(newValue!)}
      options={options}
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'User @' + (selectedUser?.id ?? 'Search')}
          placeholder={'Type User Id'}
          onChange={(event) => {
            setSearchValue(event.target.value)
            params.inputProps.onChange?.(event as any)
          }}
        />
      )}
      renderOption={({ key, ...optionProps }, user) => {
        return (
          <div key={key} {...(optionProps as any)}>
            <div className={'flex items-center gap-2'}>
              <img className={'size-8'} loading="lazy" src={user.avatar_url!} />
              {user.name}
            </div>
          </div>
        )
      }}
    />
  )
}
