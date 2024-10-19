import { User } from '@prisma/client'
import { setAuthCookie } from './cookies'
import { selectInObj } from './db/helpers'
import { UserPrivateFields } from './db/config'
import { createAuthJwtToken, createCookieJwtToken } from './jwtHelpers'

export async function generatePrivateUser(
  user: User,
  includeToken = true,
  setCookie = true
) {
  if (setCookie) {
    setAuthCookie(await createCookieJwtToken(user.id))
  }

  const authToken = includeToken ? await createAuthJwtToken(user.id) : undefined

  return {
    user: selectInObj(user, UserPrivateFields),
    authToken,
  }
}
