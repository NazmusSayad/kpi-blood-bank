import { appRoute } from '@/api-route'
import { selectInObj } from '@/db/helpers'
import { login } from '@/service/auth/auth'
import { setAuthCookie } from '@/utils/cookies'
import { UserPrivateFields } from '@/db/config'

export const POST = appRoute(async (req) => {
  const { password, id, phone } = req.data
  const foundUser = await login(password, id, phone)

  setAuthCookie(foundUser.jwtToken)
  throw selectInObj(foundUser.user, UserPrivateFields)
})
