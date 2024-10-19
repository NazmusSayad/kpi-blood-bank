import '@/styles/index.scss'
import db from '@/service/db'
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import AppProvider from '@/components/AppProvider'
import { throwPrivateUser } from '@/service/helpers'
import RootBackground from '@/components/RootBackground'
import { parseCookieJwtToken } from '@/service/jwtHelpers'

async function getAuthInfo() {
  try {
    const cookieToken = cookies().get('authorization')?.value
    if (!cookieToken) return null

    const userId = await parseCookieJwtToken(cookieToken)
    const user = await db.user.findUnique({ where: { id: userId } })

    try {
      await throwPrivateUser(user, true, false)
    } catch (err) {
      if (err instanceof Error) throw err
      return err
    }
  } catch {
    return null
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const authInfo = await getAuthInfo()

  return (
    <AppProvider authInfo={authInfo}>
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
