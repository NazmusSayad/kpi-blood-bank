import { useState } from 'react'
import { useApi } from '@/api/http'
import { PrivateUser } from '@/config'
import { useRouter } from 'next/navigation'
import { RiRefreshLine } from 'react-icons/ri'
import { Button, TextField } from '@mui/material'
import useUserStore from '@/zustand/useUserStore'
import RegisterFormLayout from './RegisterFormLayout'
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
    const { data, ok } = await api.post<{
      user: PrivateUser
      authToken: string
    }>('/auth/register/confirm', {
      otp,
      token,
    })

    if (!ok) return
    userStore.authenticate(data.user, data.authToken)
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
