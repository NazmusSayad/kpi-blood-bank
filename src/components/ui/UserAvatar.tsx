'use client'

import config from '@/config'
import { cn } from '@/utils'
import { ComponentProps, memo, useMemo } from 'react'

function UserAvatar({ avatarUrl, className, ...props }: UserAvatarProps) {
  const img = useMemo(() => {
    return (
      <img
        {...props}
        className={cn('size-8 rounded-full', className)}
        src={avatarUrl ?? config.defaultAvatar}
      />
    )
  }, [avatarUrl])

  return img
}

type UserAvatarProps = ComponentProps<'img'> & {
  avatarUrl?: string | null
}

export default memo(UserAvatar)
