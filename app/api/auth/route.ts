import db from '@/service/db'
import { ReqError } from 'req-error'
import { cookies } from 'next/headers'
import { appRoute } from '@/router/api'
import { NextResponse } from 'next/server'
import { generatePrivateUser } from '@/service/helpers'
import { parseCookieJwtToken } from '@/service/jwtHelpers'

export const GET = appRoute(async () => {
  const cookieToken = cookies().get('authorization')?.value
  if (!cookieToken) throw new ReqError('No cookie token found', 401)

  const userId = await parseCookieJwtToken(cookieToken)
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new ReqError('User not found', 401)
  throw generatePrivateUser(user)
})

export function DELETE() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      console.log('Deleting cookie:', cookie.name)
      cookies().delete(cookie.name)
    })

  return NextResponse.json({ success: true })
}
