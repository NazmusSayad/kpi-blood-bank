import { authRoute } from '@/router/api'
import { selectInObj } from '@/service/db/helpers'
import { setAuthCookie } from '@/utils/cookies'
import { UserPrivateFields } from '@/service/db/config'
import { createAuthJwtToken } from '@/service/jwtHelpers'

export const GET = authRoute(async (req) => {
  const token = await createAuthJwtToken(req.user.id)
  setAuthCookie(token)
  throw selectInObj(req.user, UserPrivateFields)
})
