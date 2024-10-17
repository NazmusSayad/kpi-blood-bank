'use client'

import { useSearchParams } from 'next/navigation'
import RegisterMainForm from './RegisterMainForm'
import RegisterVerifyForm from './RegisterVerifyForm'

export default function Register() {
  const searchParams = useSearchParams()
  const registerToken = searchParams.get('registerToken')

  // async function handleLogin() {
  //   const { data, error, ok } = await api.post<{ data: User }>(
  //     '/auth/register',
  //     {
  //       phone: +phoneNumber.replace('+8801', ''),
  //       password,
  //     }
  //   )

  //   if (!ok) {
  //     console.error(error)
  //     return
  //   }

  //   userStore.setUser(data)
  //   router.replace('/account')
  // }

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
