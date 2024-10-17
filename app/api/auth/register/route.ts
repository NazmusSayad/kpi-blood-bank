import { appRoute } from '@/router/api'
import { createSignupToken } from '@/service/auth/auth'

export const POST = appRoute(async (req) => {
  const token = await createSignupToken(req.data)
  throw { token }
})
