import { appRoute } from '@/router/api'
import { throwPrivateUser } from '@/service/helpers'
import { resetPassword } from '@/service/auth/password'

export const POST = appRoute(async (req) => {
  const { token, otp, password } = req.data
  await throwPrivateUser(await resetPassword(token, password, otp))
})
