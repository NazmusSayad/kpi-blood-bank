import BetterSelect from './BetterSelect'
import { BloodGroup } from '@prisma/client'
import { SelectProps } from '@mui/material/Select'

export default function BloodGroupSelect(props: BloodGroupSelectProps) {
  return (
    <BetterSelect
      {...props}
      label={'Blood Group'}
      items={Object.keys(BloodGroup).map((group) => ({
        value: group,
        label: group.replace('_POSITIVE', '+').replace('_NEGATIVE', '-'),
      }))}
    />
  )
}

type BloodGroupSelectProps = SelectProps
