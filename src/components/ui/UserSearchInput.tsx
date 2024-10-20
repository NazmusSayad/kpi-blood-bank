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
    async function fetchUsers() {
      const { data, ok } = await api.get<PublicUser[]>('/users', {
        signal: signal(),
      })

      if (!ok) return
      // setOptions(data)
    }

    const timeout = setTimeout(fetchUsers, 300)
    return () => {
      clearTimeout(timeout)
      abortSignal()
    }
  }, [searchValue])

  return (
    <Autocomplete
      value={selectedUser}
      onChange={(_, newValue) => setSelectedUser(newValue!)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="User"
          placeholder={'Type User Id'}
          onChange={(event) => {
            setSearchValue(event.target.value)
            params.inputProps.onChange?.(event as any)
          }}
        />
      )}
      options={options}
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.name + ' @' + option.id}
      renderOption={({ key, ...optionProps }, option) => {
        return (
          <div key={key} {...(optionProps as any)}>
            <div className={'flex items-center gap-2'}>
              <img loading="lazy" src={`https://flagcdn.com/w20/bd.png`} />
              {option.name}
            </div>
          </div>
        )
      }}
    />
  )
}
