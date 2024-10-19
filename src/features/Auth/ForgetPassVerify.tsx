import { useState } from 'react'
import { useApi } from '@/api/http'
import { useUserStore } from '@/zustand'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import ForgetPassLayout from './ForgetPassLayout'
import PasswordInput from '@/components/ui/PasswordInput'
import { PrivateUser } from '@/config'

export default function ForgetPassVerify({ token }: ForgetPassVerifyProps) {
  const api = useApi()
  const router = useRouter()
  const userStore = useUserStore()
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    const { data, ok } = await api.post<{
      user: PrivateUser
      authToken: string
    }>('/auth/reset-password/verify', {
      token,
      otp,
      password,
    })

    if (!ok) return
    userStore.authenticate(data.user, data.authToken)
    router.push('/account')
  }

  return (
    <ForgetPassLayout button={'Confirm'} handler={handleSubmit}>
      <div className={'mb-4'}>
        <TextField
          fullWidth
          required
          label={'OTP'}
          value={otp}
          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
          autoComplete={'off'}
        />
      </div>

      <div className={'mb-4'}>
        <PasswordInput
          fullWidth
          required
          label={'Passowrd'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </ForgetPassLayout>
  )
}

type ForgetPassVerifyProps = {
  token: string
  setToken: (value: string) => void
  phone: string
}
