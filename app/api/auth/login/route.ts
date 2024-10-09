import { appRoute } from '@/next-route'
import { setAuthCookie } from '@/utils/cookies'
import { login } from '@/controllers/auth/authController'

export const POST = appRoute(async (req) => {
  const { password, id, phone } = req.data
  const foundUser = await login(password, id, phone)

  setAuthCookie(foundUser.jwtToken)
  throw foundUser.user
})
