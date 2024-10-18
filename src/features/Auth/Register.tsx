'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import RegisterMainForm from './RegisterMainForm'
import RegisterVerifyForm from './RegisterVerifyForm'

function RegisterInner() {
  const searchParams = useSearchParams()
  const registerToken = searchParams.get('registerToken')

  return (
    <div className={'grid grid-rows-[auto,1fr]'}>
      <h1 className={'text-4xl text-center font-medium my-12'}>
        Create Account
      </h1>

      {registerToken ? (
        <RegisterVerifyForm token={registerToken} />
      ) : (
        <RegisterMainForm />
      )}
    </div>
  )
}

export default function Register() {
  return (
    <Suspense>
      <RegisterInner />
    </Suspense>
  )
}
