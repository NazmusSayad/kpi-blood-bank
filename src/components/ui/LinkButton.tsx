import Link from 'next/link'
import { cn } from '@/utils'
import { ComponentProps } from 'react'
import { Button } from '@mui/material'

export default function LinkButton({ className, ...props }: Props) {
  return (
    <Button
      {...props}
      LinkComponent={Link}
      className={cn('!px-3', className)}
    />
  )
}

type Props = Omit<ComponentProps<typeof Button>, 'LinkComponent' | 'href'> & {
  href: string
}
