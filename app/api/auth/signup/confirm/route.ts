import { appRoute } from '@/next-route'
import { setAuthCookie } from '@/utils/cookies'
import { confirmSignUp } from '@/controllers/auth/authController'

export const POST = appRoute(async (req) => {
  if (!req.data.token || !req.data.otp) {
    throw { message: 'Token and OTP are required', status: 400 }
  }

  const user = await confirmSignUp(
    req.data.token as string,
    req.data.otp as string
  )

  setAuthCookie(user.jwtToken)
  throw user.user
})
