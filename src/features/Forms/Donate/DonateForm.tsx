import {
  Button,
  Select,
  MenuItem,
  TextField,
  Accordion,
  InputLabel,
  FormControl,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'
import { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'
import CustomDatePicker from '@/components/ui/CustomDatePicker'
import { FormAccordion } from '../FormComponents'
import moment, { Moment } from 'moment'

export default function DonateForm() {
  const [formLevel, setFormLevel] = useState(0)
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
          <FormControl required>
            <TextField
              required
              label="নাম"
              value={state.name}
              onChange={(e) => setFormValue('name', e.target.value)}
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
            <CustomDatePicker
              label="জন্ম তারিখ"
              textFieldProps={{ required: true }}
              value={state.dateOfBirth}
              onChange={(e) => e && setFormValue('dateOfBirth', e)}
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

          <FormControl>
            <FormAccordion
              className={'!bg-transparent !border-none'}
              header={'ঠিকানা'}
            >
              <FormControl>
                <MuiTelInput
                  label="মোবাইল নাম্বার"
                  defaultCountry={'BD'}
                  onlyCountries={['BD']}
                  langOfCountryName={'bn'}
                  value={state.phoneNumber2}
                  onChange={(e) => setFormValue('phoneNumber2', e)}
                />
              </FormControl>
              <FormControl>
                <MuiTelInput
                  label="মোবাইল নাম্বার"
                  defaultCountry={'BD'}
                  onlyCountries={['BD']}
                  langOfCountryName={'bn'}
                  value={state.whatsappNumber}
                  onChange={(e) => setFormValue('whatsappNumber', e)}
                />
              </FormControl>
            </FormAccordion>
          </FormControl>

          <FormControl>
            <FormAccordion header={'Super'}>
              <FormControl>
                <CustomDatePicker label="সর্বশেষ রক্ত দানের তারিখ" />
              </FormControl>

              <FormControl>
                <CustomDatePicker label="পরবর্তী রক্ত প্রদানের তারিখ" />
              </FormControl>
            </FormAccordion>
          </FormControl>

          <FormControl>
            <Button type={'submit'} variant={'contained'} size={'large'}>
              {formLevel === 0 ? 'আবেদন করুন' : 'নিশ্চিত'}
            </Button>
          </FormControl>

          {formLevel > 0 && (
            <FormControl>
              <Button type={'submit'} variant={'outlined'} size={'large'}>
                Skip
              </Button>
            </FormControl>
          )}
        </div>
      </form>
    </div>
  )
}

export type DonationForm = {
  name: string
  phoneNumber: string
  bloodGroup: string
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
