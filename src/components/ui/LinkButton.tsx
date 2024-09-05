import { Link } from 'react-router-dom'
import { ComponentProps } from 'react'
import { Button } from '@mui/material'

export default function LinkButton({ className, ...props }: Props) {
  return (
    <Button
      {...props}
      LinkComponent={Link}
      className={cn('!px-3 !justify-start', className)}
    />
  )
}

type Props = Omit<ComponentProps<typeof Button>, 'LinkComponent' | 'href'> & {
  to: string
}
