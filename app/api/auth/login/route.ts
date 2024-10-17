import { appRoute } from '@/router/api'
import { selectInObj } from '@/service/db/helpers'
import { login } from '@/service/auth/auth'
import { setAuthCookie } from '@/utils/cookies'
import { UserPrivateFields } from '@/service/db/config'

export const POST = appRoute(async (req) => {
  const { password, id, phone } = req.data
  const foundUser = await login(password, id, phone)

  setAuthCookie(foundUser.jwtToken)
  throw selectInObj(foundUser.user, UserPrivateFields)
})
