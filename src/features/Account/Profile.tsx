'use client'

import { PublicUser } from '@/config'
import ProfileTop from './ProfileTop'
import Wrapper from '@/layouts/Wrapper'

export default function Profile({ user }: { user: PublicUser }) {
  return (
    <div>
      <ProfileTop user={user} />
    </div>
  )
}
