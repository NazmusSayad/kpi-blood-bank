'use client'

import '@/styles/index.scss'
import { http } from '@/api/http'
import { User } from '@prisma/client'
import { useLayoutEffect } from 'react'
import { useUserStore } from '@/zustand'
import muiTheme from '@/styles/mui-theme'
import { ThemeProvider } from '@mui/material'
import RootBackground from '@/components/RootBackground'

export default function Layout({ children }: { children: React.ReactNode }) {
  const userStore = useUserStore((state) => state)

  useLayoutEffect(() => {
    const hasLoggedIn = localStorage.getItem('isLoggedIn') === '1'

    if (hasLoggedIn) {
      userStore.setLoggedIn(true)
      ;(async () => {
        const { data, ok } = await http.get<{ data: User }>('/account')
        if (ok) return userStore.setUser(data)
        userStore.destroyUser()
      })()
    }
  }, [])

  return (
    <ThemeProvider theme={muiTheme}>
      <html>
        <head>
          <title>KPI Blood Bank</title>
        </head>

        <body>
          <RootBackground />
          {children}
        </body>
      </html>
    </ThemeProvider>
  )
}
