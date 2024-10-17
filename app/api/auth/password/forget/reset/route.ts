import { appRoute } from '@/router/api'
import { selectInObj } from '@/service/db/helpers'
import { setAuthCookie } from '@/utils/cookies'
import { UserPrivateFields } from '@/service/db/config'
import { resetPassword } from '@/service/auth/password'

export const POST = appRoute(async (req) => {
  const { token, otp, password } = req.data
  const { jwtToken, user } = await resetPassword(token, password, otp)

  setAuthCookie(jwtToken)
  throw selectInObj(user, UserPrivateFields)
})
