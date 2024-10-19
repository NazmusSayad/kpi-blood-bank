import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input'

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  return (
    <MuiTelInput
      {...props}
      defaultCountry={'BD'}
      onlyCountries={['BD']}
      langOfCountryName={'bn'}
      value={'+8801' + props.value}
      onChange={
        props.onChange &&
        ((e, info) => {
          const number = e.replace(/ /g, '').replace('+8801', '')
          if (number.length > 9) return
          props.onChange?.(number, info)
        })
      }
    />
  )
}

type PhoneNumberInputProps = MuiTelInputProps
