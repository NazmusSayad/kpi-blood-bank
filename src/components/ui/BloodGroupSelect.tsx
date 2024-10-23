import BetterSelect from './BetterSelect'
import { BloodGroup } from '@prisma/client'
import { SelectProps } from '@mui/material/Select'

export default function BloodGroupSelect({
  setValue,
  ...props
}: BloodGroupSelectProps) {
  return (
    <BetterSelect
      onChange={setValue && ((e) => setValue(e.target.value as BloodGroup))}
      label={'Blood Group'}
      {...props}
      items={[...Object.keys(BloodGroup)].filter(Boolean).map((group) => ({
        value: group,
        label: group.replace('_POSITIVE', '+').replace('_NEGATIVE', '-'),
      }))}
    />
  )
}

type BloodGroupSelectProps = SelectProps & {
  value?: BloodGroup | ''
  setValue?: (value: BloodGroup | '') => void
}
