import '@/styles/index.scss'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import AppLayout from './AppLayout'
import AppProvider from '@/components/AppProvider'
import RootBackground from '@/components/RootBackground'

export const metadata: Metadata = {
  other: {
    icon: 'Blood Bank Management System',
  },
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <html>
        <head>
          <title>KPI Blood Bank</title>
        </head>

        <body>
          <RootBackground />
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </AppProvider>
  )
}
