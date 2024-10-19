import { authRoute } from '@/router/api'
import { throwPrivateUser } from '@/service/helpers'

export const GET = authRoute(async (req) => {
  await throwPrivateUser(req.user, false, false)
})

export const PATCH = authRoute(async (req) => {
  throw {
    STATUS: 'NOT_IMPLEMENTED',
    ...req.data,
  }
})
