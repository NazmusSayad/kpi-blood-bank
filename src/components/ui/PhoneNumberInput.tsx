import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input'

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  return (
    <MuiTelInput
      {...props}
      defaultCountry={'BD'}
      onlyCountries={['BD']}
      langOfCountryName={'bn'}
      onChange={
        props.onChange &&
        ((e, info) => {
          e = e.replaceAll(/ /g, '')
          if (!e.startsWith('+8801')) return
          if (e.length > 14) return
          props.onChange(e, info)
        })
      }
    />
  )
}

type PhoneNumberInputProps = MuiTelInputProps
