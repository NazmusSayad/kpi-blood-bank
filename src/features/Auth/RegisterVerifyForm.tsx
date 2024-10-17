import { useState } from 'react'
import { useApi } from '@/api/http'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { useUserStore } from '@/zustand'
import { TextField } from '@mui/material'
import RegisterFormLayout from './RegisterFormLayout'

export default function RegisterVerifyForm({ token }) {
  const api = useApi()
  const router = useRouter()
  const userStore = useUserStore()
  const [otp, setOtp] = useState('')

  async function handleSubmit() {
    const { data, ok } = await api.post<{ data: User }>(
      '/auth/register/confirm',
      { otp, token }
    )

    if (!ok) return
    userStore.setUser(data)
    router.push('/account')
  }

  return (
    <RegisterFormLayout handler={handleSubmit} button={'Confirm'}>
      <div className={'mb-4'}>
        <TextField
          fullWidth
          required
          label={'OTP'}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
    </RegisterFormLayout>
  )
}
