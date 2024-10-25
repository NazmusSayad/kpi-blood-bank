import Link from 'next/link'
import { cn } from '@/utils'
import { ComponentProps } from 'react'
import { Button, IconButton } from '@mui/material'

export default function LinkButton({ className, iconButton, ...props }: Props) {
  if (iconButton) {
    return <IconButton {...props} LinkComponent={Link} className={cn(className)} />
  }

  return <Button {...props} LinkComponent={Link} className={cn('!px-3', className)} />
}

type Props = Omit<ComponentProps<typeof Button>, 'LinkComponent' | 'href'> & {
  href: string
  iconButton?: boolean
}
