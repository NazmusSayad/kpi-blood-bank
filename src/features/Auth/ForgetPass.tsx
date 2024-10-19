'use client'

import { useLayoutEffect, useState } from 'react'
import ForgetPassVerify from './ForgetPassVerify'
import ForgetPassMain from './ForgetPassMain'
import { useUserStore } from '@/zustand'

export default function Forget() {
  const [token, setToken] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const userPhoneNumber = useUserStore((state) => state.user?.phone)

  useLayoutEffect(() => {
    if (userPhoneNumber) setPhoneNumber(String(userPhoneNumber))
  }, [userPhoneNumber])

  return (
    <div className={'grid grid-rows-[auto,1fr]'}>
      <h1 className={'text-4xl text-center font-medium mb-12'}>
        {token ? 'Verify Phone Number' : 'Forget Password'}
      </h1>

      {token ? (
        <ForgetPassVerify
          token={token}
          setToken={setToken}
          phone={phoneNumber}
        />
      ) : (
        <ForgetPassMain
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          token={token}
          setToken={setToken}
        />
      )}
    </div>
  )
}
