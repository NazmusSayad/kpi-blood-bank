import { cn } from '@/utils'
import { ComponentProps } from 'react'

export default function Wrapper(props: Props) {
  return (
    <div
      {...props}
      className={cn(
        'max-w-[95rem] w-full mx-auto px-[3%] lg:px-[5%]',
        props.className
      )}
    />
  )
}

type Props = ComponentProps<'div'>
