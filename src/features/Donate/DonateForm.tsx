import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'
import CustomDatePicker from '@/components/ui/CustomDatePicker'

export default function DonateForm() {
  const [state, setState] = useState<{
    name: string
    phoneNumber: string
    bloodGroup: string
    address: string
    dateOfBirth: string
  }>({
    name: '',
    phoneNumber: '+8801',
    bloodGroup: '',
    address: '',
    dateOfBirth: '',
  })

  function setFormValue(key: keyof typeof state, value: string) {
    setState({ ...state, [key]: value })
  }

  return (
    <div className={'pt-10'}>
      <form className={'max-w-[40rem] mx-auto'}>
        <div className={'grid gap-3'}>
          <FormControl required>
            <TextField
              required
              label="নাম"
              value={state.name}
              onChange={(e) => setFormValue('name', e.target.value)}
            />
          </FormControl>

          <FormControl required>
            <CustomDatePicker
              label="জন্ম তারিখ"
              textFieldProps={{ required: true }}
            />
          </FormControl>

          <FormControl required>
            <InputLabel id="blood-group-label">রক্তের গ্রুপ</InputLabel>
            <Select
              required
              label="রক্তের গ্রুপ"
              placeholder="রক্তের গ্রুপ"
              labelId={'blood-group-label'}
              value={state.bloodGroup}
              onChange={(e) => setFormValue('bloodGroup', e.target.value)}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>

          <FormControl required>
            <CustomDatePicker
              label="সর্বশেষ রক্ত দানের তারিখ"
              textFieldProps={{ required: true }}
            />
          </FormControl>

          <FormControl required>
            <CustomDatePicker
              label="পরবর্তী রক্ত প্রদানের তারিখ"
              textFieldProps={{ required: true }}
            />
          </FormControl>

          <FormControl required>
            <MuiTelInput
              required
              label="মোবাইল নাম্বার"
              defaultCountry={'BD'}
              onlyCountries={['BD']}
              langOfCountryName={'bn'}
              value={state.phoneNumber}
              onChange={(e) => setFormValue('phoneNumber', e)}
            />
          </FormControl>

          <FormControl required>
            <TextField
              required
              label="Address"
              value={state.address}
              onChange={(e) => setFormValue('address', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <Button type={'submit'} variant={'contained'} size={'large'}>
              Submit for Donation
            </Button>
          </FormControl>
        </div>
      </form>
    </div>
  )
}
