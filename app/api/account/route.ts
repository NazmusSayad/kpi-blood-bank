import { authRoute } from '@/next-route'
import { setAuthCookie } from '@/utils/cookies'
import { createAuthJwtToken } from '@/controllers/auth/helpers'

export const GET = authRoute(async (req) => {
  const token = await createAuthJwtToken(req.user.id)
  setAuthCookie(token)
  throw { user: req.user, ip: req.ip }
})
