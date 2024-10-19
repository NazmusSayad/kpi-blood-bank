import { User } from '@prisma/client'
import { cookies } from 'next/headers'
import { selectInObj } from './db/helpers'
import { UserPrivateFields } from './db/config'
import { createAuthJwtToken, createCookieJwtToken } from './jwtHelpers'

export async function throwPrivateUser(
  user: User,
  includeToken = true,
  setCookie = true
) {
  if (setCookie) {
    const cookieToken = await createCookieJwtToken(user.id)
    cookies().set('authorization', cookieToken, {
      httpOnly: true,
      secure: true,
    })
  }

  const authToken = includeToken ? await createAuthJwtToken(user.id) : undefined

  throw {
    authToken,
    user: selectInObj(user, UserPrivateFields),
  }
}
