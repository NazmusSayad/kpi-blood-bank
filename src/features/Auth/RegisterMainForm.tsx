'use client'

import { useApi } from '@/api/http'
import { TextField } from '@mui/material'
import { AccountType } from '@prisma/client'
import RegisterFormLayout from './RegisterFormLayout'
import BetterSelect from '@/components/ui/BetterSelect'
import PasswordInput from '@/components/ui/PasswordInput'
import PhoneNumberInput from '@/components/ui/PhoneNumberInput'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'
import type { RegisterFormData, SetRegisterFormData } from './Register'

export default function RegisterMainForm({
  formData,
  setFormData,
  setToken,
}: {
  formData: RegisterFormData
  setFormData: SetRegisterFormData
  setToken: (token: string) => void
}) {
  const api = useApi()

  async function handleRegister() {
    const { data, ok } = await api.post<{ token: string }>('/auth/register', {
      ...formData,
      phone: +formData.phone,
    })

    if (ok) return setToken(data.token)
  }

  return (
    <RegisterFormLayout
      error={api.response?.error as string}
      handler={handleRegister}
      button={'Register'}
    >
      <div className={'grid gap-4'}>
        <TextField
          required
          fullWidth
          label={'Full Name'}
          value={formData.name}
          onChange={(e) => setFormData('name', e.target.value)}
        />

        <BloodGroupSelect
          required
          fullWidth
          value={formData.bloodGroup}
          onChange={(e) => setFormData('bloodGroup', e.target.value as string)}
        />

        <PhoneNumberInput
          required
          fullWidth
          label={'Phone Number'}
          value={formData.phone}
          onChange={(e) => setFormData('phone', e)}
        />

        <BetterSelect
          required
          fullWidth
          label={'Account Type'}
          value={formData.accountType}
          onChange={(e) => setFormData('accountType', e.target.value as any)}
          items={Object.keys(AccountType).map((type) => ({
            value: type,
            label: type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase(),
          }))}
        />

        <TextField
          fullWidth
          required={
            formData.accountType === AccountType.STUDENT
              ? !formData.birthCertificateNumber
              : true
          }
          label={'NID Number'}
          value={formData.nidNumber}
          onChange={(e) =>
            setFormData('nidNumber', e.target.value.replace(/\D/g, ''))
          }
        />

        <TextField
          fullWidth
          required={
            formData.accountType === AccountType.STUDENT && !formData.nidNumber
          }
          label={'Birth Certificate Number'}
          value={formData.birthCertificateNumber}
          onChange={(e) => {
            setFormData(
              'birthCertificateNumber',
              e.target.value.replace(/\D/g, '')
            )
          }}
        />

        <PasswordInput
          required
          fullWidth
          label={'Password'}
          value={formData.password}
          onChange={(e) => setFormData('password', e.target.value)}
        />
      </div>
    </RegisterFormLayout>
  )
}
