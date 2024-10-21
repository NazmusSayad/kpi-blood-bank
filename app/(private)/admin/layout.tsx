'use client'

import Nav from '@/features/Nav'
import { userHasAccess } from '@/service/utils'
import useUserStore from '@/zustand/useUserStore'

export default function Layout({ children }) {
  const user = useUserStore((state) => state.user)

  return (
    <main className={'grid grid-rows-[auto_1fr]'}>
      <Nav />
      {user &&
        (userHasAccess(user).moderator ? children : <p>Access denied</p>)}
    </main>
  )
}
