import { appRoute } from '@/router/api'
import { login } from '@/service/auth/auth'
import { generatePrivateUser } from '@/service/helpers'

export const POST = appRoute(async (req) => {
  const { password, id, phone } = req.data
  throw generatePrivateUser(await login(password, id, phone))
})
