import { useApi } from '@/api/http'
import ForgetPassLayout from './ForgetPassLayout'
import PhoneNumberInput from '@/components/ui/PhoneNumberInput'

export default function ForgetPassMain({ phone, setPhone, setToken }: ForgetPassMainProps) {
  const api = useApi()
  async function handleSubmit() {
    const { data, ok } = await api.post<{ token: string }>('/auth/reset-password', { phone })

    if (!ok) return
    setToken(data.token)
  }

  return (
    <ForgetPassLayout button={'Next'} handler={handleSubmit} error={api.response?.error}>
      <div className={'mb-4'}>
        <PhoneNumberInput
          fullWidth
          required
          label={'Phone Number'}
          value={phone}
          onChange={setPhone}
        />
      </div>
    </ForgetPassLayout>
  )
}

type ForgetPassMainProps = {
  phone: string
  setPhone: (value: string) => void
  token: string
  setToken: (value: string) => void
}
