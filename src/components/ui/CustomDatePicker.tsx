import {
  DatePicker,
  DatePickerSlotProps,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { ComponentProps } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function CustomDatePicker({
  textFieldProps,
  ...props
}: ComponentProps<typeof DatePicker> & {
  textFieldProps?: DatePickerSlotProps<any, false>['textField']
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker {...props} slotProps={{ textField: textFieldProps }} />
    </LocalizationProvider>
  )
}
