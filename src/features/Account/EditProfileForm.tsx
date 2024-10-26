import { useState } from 'react'
import { PrivateUser } from '@/config'
import { Button, TextField } from '@mui/material'

export default function EditProfileForm({ user }: { user: PrivateUser }) {
  const [formData, setFormDataCore] = useState({ ...user })
  const setFormData = (newData: Partial<PrivateUser>) => {
    setFormDataCore({ ...formData, ...newData })
  }

  function handleSubmit() {
    console.log('submitting', formData)
  }

  return (
    <form
      className={'py-1 grid gap-5'}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <TextField
        required
        fullWidth
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ name: e.target.value })}
      />

      <TextField
        fullWidth
        label="Email"
        type={'email'}
        value={formData.email ?? ''}
        onChange={(e) => setFormData({ email: e.target.value })}
      />

      <Button variant={'contained'} type={'submit'}>Save</Button>
    </form>
  )
}
