'use client'

import { userHasAccess } from '@/service/utils'
import useUserStore from '@/zustand/useUserStore'

export default function Layout({ children }) {
  const user = useUserStore((state) => state.user)

  return user && (userHasAccess(user).moderator ? children : <p>Access denied</p>)
}
