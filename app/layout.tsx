'use client'

import '@/styles/index.scss'
import muiTheme from '@/styles/mui-theme'
import { ThemeProvider } from '@mui/material'

import Nav from '@/features/Nav'
import RootBackground from '@/components/RootBackground'

export default function Layout({ children }: { children: React.ReactNode }) {
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
