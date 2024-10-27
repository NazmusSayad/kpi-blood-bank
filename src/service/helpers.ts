import { User } from '@prisma/client'
import { setAuthCookie } from './cookies'
import { selectInObj } from './db/helpers'
import { createAuthJwtToken, createCookieJwtToken } from './jwtHelpers'
import { AdminUser, PrivateUser, UserAdminFields, UserPrivateFields } from '@/config'

export async function generatePrivateUser(user: User, includeToken = true, setCookie = true) {
  if (setCookie) {
    setAuthCookie(await createCookieJwtToken(user.id))
  }

  const authToken = includeToken ? await createAuthJwtToken(user.id) : undefined

  return {
    user: selectInObj(user, UserPrivateFields) as PrivateUser,
    authToken,
  }
}

export async function generateAdminUser(user: User) {
  return {
    user: selectInObj(user, UserAdminFields) as AdminUser,
  }
}
