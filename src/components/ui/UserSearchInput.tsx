'use client'

import { useApi } from '@/api/http'
import { PublicUser } from '@/config'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import { Autocomplete, TextField } from '@mui/material'

export default function UserSearchInput() {
  const api = useApi()
  const [signal, abortSignal] = useAbortSignal()

  const [searchValue, setSearchValue] = useState('')
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null)
  const [options, setOptions] = useState<PublicUser[]>([
    {
      id: 1,
      accountType: 'GUEST',
      avatar_url: 'https://flagcdn.com/w20/bd.png',
      bloodGroup: 'AB_NEGATIVE',
      email: '247sayad@gmail.com',
      name: 'The Godfather',
      role: 'MEMBER',
      student_department: 'CSE',
      student_educationalInstitute: 'DIU',
      student_session: '2017-18',
    },
    {
      id: 2,
      accountType: 'GUEST',
      avatar_url: 'https://flagcdn.com/w20/bd.png',
      bloodGroup: 'AB_NEGATIVE',
      email: '247sayad@gmail.com',
      name: 'The Super',
      role: 'MEMBER',
      student_department: 'CSE',
      student_educationalInstitute: 'DIU',
      student_session: '2017-18',
    },
  ])

  useEffect(() => {
    if (!searchValue) return setOptions([])

    async function fetchUsers() {
      const { data, ok } = await api.get<PublicUser[]>(
        `/users/?id=${searchValue}&name=${searchValue}`,
        {
          signal: signal(),
        }
      )

      if (!ok) return
      setOptions(data)
    }

    const timeout = setTimeout(fetchUsers, 300)
    return () => {
      clearTimeout(timeout)
      abortSignal()
    }
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
