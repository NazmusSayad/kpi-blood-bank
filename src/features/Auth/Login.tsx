'use client'

import { useState } from 'react'
import { useApi } from '@/api/http'
import { Button } from '@mui/material'
import { User } from '@prisma/client'
import { useUserStore } from '@/zustand'
import { useRouter } from 'next/navigation'
import PasswordInput from '@/components/ui/PasswordInput'
import PhoneNumberInput from '@/components/ui/PhoneNumberInput'

export default function Login() {
  const api = useApi()
  const router = useRouter()
  const userStore = useUserStore()
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('+8801')

  async function handleLogin() {
    const { data, error, ok } = await api.post<{ data: User }>('/auth/login', {
      phone: +phoneNumber.replace('+8801', ''),
      password,
    })

    if (!ok) {
      console.error(error)
      return
    }

    userStore.setUser(data)
    router.replace('/account')
  }

  return (
    <div className={'bg-green-300 h-full'}>
      <h1 className={'text-4xl text-center font-medium'}>Sign in</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div className={'grid gap-4'}>
          <div>
            <PhoneNumberInput
              fullWidth
              required
              label={'Phone Number'}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>

          <div>
            <PasswordInput
              fullWidth
              required
              label={'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button type={'submit'}>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
