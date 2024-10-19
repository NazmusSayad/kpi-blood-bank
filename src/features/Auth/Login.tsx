'use client'

import { useState } from 'react'
import { useApi } from '@/api/http'
import { Button } from '@mui/material'
import { PrivateUser } from '@/config'
import { useRouter } from 'next/navigation'
import useUserStore from '@/zustand/useUserStore'
import LinkButton from '@/components/ui/LinkButton'
import PasswordInput from '@/components/ui/PasswordInput'
import PhoneNumberInput from '@/components/ui/PhoneNumberInput'

export default function Login() {
  const api = useApi()
  const router = useRouter()
  const userStore = useUserStore()
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  async function handleLogin() {
    const { data, ok } = await api.post<{
      user: PrivateUser
      authToken: string
    }>('/auth/login', {
      phone: +phoneNumber,
      password,
    })

    if (!ok) return
    userStore.authenticate(data.user, data.authToken)
    router.replace('/account')
  }

  return (
    <div className={'grid grid-rows-[auto,1fr]'}>
      <h1 className={'text-4xl text-center font-medium mb-12'}>Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div className={'mb-4'}>
          <PhoneNumberInput
            fullWidth
            required
            label={'Phone Number'}
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>

        <div className={'mb-0'}>
          <PasswordInput
            fullWidth
            required
            label={'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={'text-right gap-0'}>
          <LinkButton
            size={'small'}
            className="text-blue-500"
            href="/auth/reset"
          >
            Forgot Password?
          </LinkButton>
        </div>

        <div className={'mb-2'}>
          <Button fullWidth variant={'contained'} type={'submit'}>
            Login
          </Button>
        </div>

        <div>
          <p className={'text-center'}>
            Don't have an account?{' '}
            <LinkButton
              size={'small'}
              className="text-blue-500"
              href="/auth/register"
            >
              Register
            </LinkButton>
          </p>
        </div>
      </form>
    </div>
  )
}
