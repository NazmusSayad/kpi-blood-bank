import { appRoute } from '@/router/api'
import { login } from '@/service/auth/auth'
import { throwPrivateUser } from '@/service/helpers'

export const POST = appRoute(async (req) => {
  const { password, id, phone } = req.data
  await throwPrivateUser(await login(password, id, phone))
})
