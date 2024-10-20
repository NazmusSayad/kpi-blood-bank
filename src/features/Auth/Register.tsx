'use client'

import { useState } from 'react'
import { AccountType } from '@prisma/client'
import RegisterMainForm from './RegisterMainForm'
import RegisterVerifyForm from './RegisterVerifyForm'

export default function Register() {
  const [registerToken, setRegisterToken] = useState<string | null>(null)
  const [registerFormData, setRegisterFormDataCore] = useState(
    registerFormDataDefault
  )

  const setRegisterFormData: SetRegisterFormData = (key, input) => {
    setRegisterFormDataCore((prev) => ({ ...prev, [key]: input }))
  }

  return (
    <div className={'grid grid-rows-[auto,1fr]'}>
      <h1 className={'text-4xl text-center font-medium my-12'}>
        {registerToken ? 'Verify Account' : 'Create Account'}
      </h1>

      {registerToken ? (
        <RegisterVerifyForm
          token={registerToken}
          setToken={setRegisterToken}
          formData={registerFormData}
          setFormData={setRegisterFormData}
        />
      ) : (
        <RegisterMainForm
          formData={registerFormData}
          setToken={setRegisterToken}
          setFormData={setRegisterFormData}
        />
      )}
    </div>
  )
}

export type RegisterFormData = typeof registerFormDataDefault
export type SetRegisterFormData = <T extends keyof RegisterFormData>(
  key: T,
  input: RegisterFormData[T]
) => void

const registerFormDataDefault = {
  name: 'Nazmus Sayad',
  password: 'superhero',
  bloodGroup: 'A_POSITIVE',
  phone: '+8801712345678',
  accountType: AccountType.STUDENT,
  nidNumber: '12345678',
  birthCertificateNumber: '',
}
