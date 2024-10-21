import { useState } from 'react'
import { useApi } from '@/api/http'
import { PrivateUser } from '@/config'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import useUserStore from '@/zustand/useUserStore'
import ForgetPassLayout from './ForgetPassLayout'
import PasswordInput from '@/components/ui/PasswordInput'

export default function ForgetPassVerify({ token }: ForgetPassVerifyProps) {
  const api = useApi()
  const router = useRouter()
  const userStore = useUserStore()
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    const { ok, data } = await api.post<{
      user: PrivateUser
      authToken: string
    }>('/auth/reset-password/verify', {
      token,
      otp,
      password,
    })

    if (!ok) return
    userStore.authenticate(data.user, data.authToken)
    router.push('/@' + data.user.id)
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
