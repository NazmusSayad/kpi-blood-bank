'use client'

import { http } from '@/api/http'
import { useUserStore } from '@/zustand'
import muiTheme from '@/styles/mui-theme'
import { ThemeProvider } from '@mui/material'
import { ReactNode, useLayoutEffect } from 'react'
import { PrivateUser } from '@/config'

export default function AppProvider({
  children,
  authInfo,
}: {
  children: ReactNode
  authInfo: { user: PrivateUser; authToken: string } | null
}) {
  const userStore = useUserStore()

  useLayoutEffect(() => {
    if (!authInfo) return userStore.clearUser()
    userStore.authenticate(authInfo.user, authInfo.authToken)
    http.get('/auth/refresh').then(() => console.log('Cookie refreshed...'))
  }, [authInfo])

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
