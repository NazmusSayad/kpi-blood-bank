import { cookieAuthRoute } from '@/router/api'
import { throwPrivateUser } from '@/service/helpers'

export const GET = cookieAuthRoute(async (req, ctx) => {
  await throwPrivateUser(req.user)
})
