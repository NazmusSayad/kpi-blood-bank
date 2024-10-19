import { ReqError } from 'req-error'
import { cookies } from 'next/headers'
import { appRoute } from '@/router/api'
import { setAuthCookie } from '@/service/cookies'
import { createCookieJwtToken, parseCookieJwtToken } from '@/service/jwtHelpers'

export const GET = appRoute(async (req) => {
  const cookieToken = cookies().get('authorization')?.value
  if (!cookieToken) throw new ReqError('No cookie token found', 401)

  const userId = await parseCookieJwtToken(cookieToken)
  setAuthCookie(await createCookieJwtToken(userId))
  throw { ok: true }
})
