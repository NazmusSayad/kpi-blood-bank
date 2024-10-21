'use client'

import { PublicUser } from '@/config'
import PublicProfile from './PublicProfile'
import PrivateProfile from './PrivateProfile'
import useUserStore from '@/zustand/useUserStore'

export default function Profile({ user }: { user: PublicUser }) {
  const activeUser = useUserStore((state) => state.user)
  return activeUser?.id === user.id ? (
    <PrivateProfile user={activeUser} />
  ) : (
    <PublicProfile user={user} />
  )
}
