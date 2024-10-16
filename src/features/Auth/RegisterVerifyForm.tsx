import { useState } from 'react'
import { useApi } from '@/api/http'
import { User } from '@prisma/client'
import { useUserStore } from '@/zustand'
import { useRouter } from 'next/navigation'
import { RiRefreshLine } from 'react-icons/ri'
import RegisterFormLayout from './RegisterFormLayout'
import { Button, TextField, Tooltip } from '@mui/material'
import type { RegisterFormData, SetRegisterFormData } from './Register'

export default function RegisterVerifyForm({
  token,
  formData,
  setFormData,
  setToken,
}: {
  token: string
  formData: RegisterFormData
  setFormData: SetRegisterFormData
  setToken: (token: string | null) => void
}) {
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

  function handleBack() {
    setToken(null)
  }

  return (
    <RegisterFormLayout handler={handleSubmit} button={'Confirm'}>
      <div className={'mb-4'}>
        <p className={'text-lg flex items-center justify-center'}>
          <span>We have send an OTP to</span>

          <Button
            size={'small'}
            className={'text-primary'}
            onClick={handleBack}
          >
            <div className={'flex gap-1 items-center'}>
              <span>{formData.phone}</span>
              <RiRefreshLine />
            </div>
          </Button>
        </p>

        {/* <div className={'flex items-center justify-center text-sm opacity-60'}>
          <p>No OTP received?</p>
          <Button size={'small'}>Resend OTP</Button>
        </div> */}
      </div>

      <div className={'mb-4'}>
        <TextField
          fullWidth
          required
          label={'OTP'}
          value={otp}
          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
        />
      </div>
    </RegisterFormLayout>
  )
}
