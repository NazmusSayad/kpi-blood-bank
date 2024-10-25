import { appRoute } from '@/router/api'
import { confirmSignUp } from '@/service/auth/auth'
import { generatePrivateUser } from '@/service/helpers'

export const POST = appRoute(async (req) => {
  if (!req.data.token || !req.data.otp) {
    throw { message: 'Token and OTP are required', status: 400 }
  }

  const user = await confirmSignUp(req.data.token as string, req.data.otp as string)

  throw generatePrivateUser(user)
})
