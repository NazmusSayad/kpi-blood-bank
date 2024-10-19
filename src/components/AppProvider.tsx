'use client'

import { http } from '@/api/http'
import { PrivateUser } from '@/config'
import muiTheme from '@/styles/mui-theme'
import { ThemeProvider } from '@mui/material'
import useUserStore from '@/zustand/useUserStore'
import { ReactNode, useLayoutEffect } from 'react'

export default function AppProvider({ children }: { children: ReactNode }) {
  const userStore = useUserStore()

  useLayoutEffect(() => {
    ;(async () => {
      const { data, ok } = await http.get<{
        user: PrivateUser
        authToken: string
      }>('/auth')

      if (!ok) return userStore.clearUser()
      userStore.authenticate(data.user, data.authToken)
    })()
  }, [])

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
