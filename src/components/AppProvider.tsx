'use client'

import { User } from '@prisma/client'
import { useUserStore } from '@/zustand'
import muiTheme from '@/styles/mui-theme'
import { ThemeProvider } from '@mui/material'
import { ReactNode, useLayoutEffect } from 'react'

export default function AppProvider({
  children,
  authInfo,
}: {
  children: ReactNode
  authInfo: { user: User; authToken: string } | null
}) {
  const userStore = useUserStore()

  useLayoutEffect(() => {
    if (!authInfo) return userStore.clearUser()
    userStore.authenticate(authInfo.user, authInfo.authToken)
  }, [authInfo])

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
