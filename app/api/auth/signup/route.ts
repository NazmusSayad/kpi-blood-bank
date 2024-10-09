import { appRoute } from '@/next-route'
import { createSignupToken } from '@/controllers/auth/authController'

export const POST = appRoute(async (req) => {
  const token = await createSignupToken(req.data)
  throw { token }
})
