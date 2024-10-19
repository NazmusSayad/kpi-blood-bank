import { appRoute } from '@/router/api'
import { generatePrivateUser } from '@/service/helpers'
import { resetPassword } from '@/service/auth/password'

export const POST = appRoute(async (req) => {
  const { token, otp, password } = req.data
  throw generatePrivateUser(await resetPassword(token, password, otp))
})
