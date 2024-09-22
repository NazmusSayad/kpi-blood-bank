import { ComponentProps } from 'react'
import { Button } from '@mui/material'
import { cn } from '@/utils'
import Link from 'next/link'

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
  href: string
}
