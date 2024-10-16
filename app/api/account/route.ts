import { authRoute } from '@/next-route'
import { selectInObj } from '@/db/helpers'
import { setAuthCookie } from '@/utils/cookies'
import { UserPrivateFields } from '@/db/config'
import { createAuthJwtToken } from '@/service/auth/_jwtHelpers'

export const GET = authRoute(async (req) => {
  const token = await createAuthJwtToken(req.user.id)
  setAuthCookie(token)
  throw selectInObj(req.user, UserPrivateFields)
})
