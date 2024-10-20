'use client'

import { useState } from 'react'
import moment, { Moment } from 'moment'
import { BloodGroup } from '@prisma/client'
import useUserStore from '@/zustand/useUserStore'
import { Button, FormControl } from '@mui/material'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'
import UserSearchInput from '@/components/ui/UserSearchInput'

export default function DonateForm() {
  const userStore = useUserStore()
  const [state, setState] = useState<DonationForm>(defaultDonationForm)

  function setFormValue<T extends keyof DonationForm>(
    key: T,
    value: DonationForm[T]
  ) {
    setState({ ...state, [key]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Submit', state)
  }

  return (
    <div className={'pt-10 pb-12'}>
      <form className={'max-w-[40rem] mx-auto'} onSubmit={handleSubmit}>
        <div className={'grid gap-3'}>
          <BloodGroupSelect
            disabled
            value={userStore.user?.bloodGroup ?? ''}
            onChange={(e) => setFormValue('bloodGroup', e.target.value as any)}
          />

          <UserSearchInput />

          <FormControl>
            <Button type={'submit'} variant={'contained'} size={'large'}>
              আবেদন করুন
            </Button>
          </FormControl>
        </div>
      </form>
    </div>
  )
}

export type DonationForm = {
  name: string
  phoneNumber: string
  bloodGroup: BloodGroup | ''
  address: string
  dateOfBirth: Moment

  phoneNumber2: string
  whatsappNumber: string
}

const defaultDonationForm: DonationForm = {
  name: '',
  phoneNumber: '',
  bloodGroup: '',
  address: '',
  dateOfBirth: moment(),

  phoneNumber2: '',
  whatsappNumber: '',
}
