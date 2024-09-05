import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { useState } from 'react'

export default function DonateForm() {
  const [state, setState] = useState<{
    name: string
    age: string
    phoneNumber: string
    bloodGroup: string
    address: string
  }>({
    name: '',
    age: '',
    phoneNumber: '+8801',
    bloodGroup: '',
    address: '',
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
              label="Name"
              value={state.name}
              onChange={(e) => setFormValue('name', e.target.value)}
            />
          </FormControl>

          <FormControl required>
            <TextField
              type={'number'}
              required
              label="Age"
              value={state.age}
              onChange={(e) => setFormValue('age', e.target.value)}
            />
          </FormControl>

          <FormControl required>
            <InputLabel id="blood-group-label">Blood Group</InputLabel>
            <Select
              required
              label="Blood Group"
              placeholder="Blood Group"
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
            <MuiTelInput
              required
              defaultCountry={'BD'}
              onlyCountries={['BD']}
              langOfCountryName={'bn'}
              label="Phone Number"
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
