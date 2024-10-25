import { useId } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel } from '@mui/material'
import Select, { SelectProps } from '@mui/material/Select'

export default function BetterSelect({ clearable, ...props }: BetterSelectProps) {
  const id = useId()
  const label = props.label ?? undefined

  return (
    <FormControl fullWidth={props.fullWidth} required={props.required}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select {...props} labelId={id} label={label}>
        {clearable && (
          <MenuItem value={''} className={'text-gray-600'}>
            Clear
          </MenuItem>
        )}

        {props.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type BetterSelectProps = SelectProps & {
  items: { label: string; value: string }[]
  clearable?: boolean
}
