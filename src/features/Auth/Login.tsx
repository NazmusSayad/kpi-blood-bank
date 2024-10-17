'use client'

import { useState } from 'react'
import { useApi } from '@/api/http'
import { Button } from '@mui/material'
import { User } from '@prisma/client'
import { useUserStore } from '@/zustand'
import { useRouter } from 'next/navigation'
import LinkButton from '@/components/ui/LinkButton'
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

    if (!ok) return
    userStore.setUser(data)
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
        <div>
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
              href="/forgot-password"
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
                href="/register"
              >
                Register
              </LinkButton>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
