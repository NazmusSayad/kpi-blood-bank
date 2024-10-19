import { authRoute } from '@/router/api'
import { generatePrivateUser } from '@/service/helpers'

export const GET = authRoute(async (req) => {
  throw generatePrivateUser(req.user, false, false)
})

export const PATCH = authRoute(async (req) => {
  throw {
    STATUS: 'NOT_IMPLEMENTED',
    ...req.data,
  }
})
