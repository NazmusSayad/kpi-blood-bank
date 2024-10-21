'use client'

import { PublicUser } from '@/config'

export default function PublicProfile({ user }: { user: PublicUser }) {
  return <div>{JSON.stringify(user, null, 2)}</div>
}
