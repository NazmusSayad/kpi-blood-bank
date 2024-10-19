import '@/styles/index.scss'
import { ReactNode } from 'react'
import AppProvider from '@/components/AppProvider'
import RootBackground from '@/components/RootBackground'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <html>
        <head>
          <title>KPI Blood Bank</title>
        </head>

        <body>
          <RootBackground />
          {children}
        </body>
      </html>
    </AppProvider>
  )
}
