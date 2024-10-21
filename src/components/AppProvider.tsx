'use client'

import { http } from '@/api/http'
import { PrivateUser } from '@/config'
import muiTheme from '@/styles/mui-theme'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@mui/material'
import useUserStore from '@/zustand/useUserStore'
import { ReactNode, useLayoutEffect } from 'react'

export default function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const userStore = useUserStore()

  useLayoutEffect(() => {
    ;(async () => {
      const { data, ok } = await http.get<{
        user: PrivateUser
        authToken: string
      }>('/auth')

      if (!ok) {
        userStore.clear()
        await http.delete('/auth')
        return router.refresh()
      }
      userStore.authenticate(data.user, data.authToken)
    })()
  }, [])

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
