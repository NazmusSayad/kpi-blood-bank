import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input'

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  return (
    <MuiTelInput
      {...props}
      defaultCountry={'BD'}
      onlyCountries={['BD']}
      langOfCountryName={'bn'}
      value={props.value || '+8801'}
      onChange={
        props.onChange &&
        ((e, info) => {
          const number = e.replace(/ /g, '').slice(0, 14)
          if (!number.startsWith('+8801')) return
          props.onChange?.(number, info)
        })
      }
    />
  )
}

type PhoneNumberInputProps = MuiTelInputProps
