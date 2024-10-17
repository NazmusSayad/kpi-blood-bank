import { appRoute } from '@/router/api'
import { forgetPassword } from '@/service/auth/password'

export const POST = appRoute(async (req) => {
  const { phone } = req.data
  throw (await forgetPassword(phone))
})
