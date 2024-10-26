import { authRoute } from '@/router/api'
import { updateUser } from '@/service/account/user'
import { generatePrivateUser } from '@/service/helpers'

export const GET = authRoute(async (req) => {
  throw generatePrivateUser(req.user, false, false)
})

export const PATCH = authRoute(async (req) => {
  const newUser = await updateUser(req.user.id, req.data)
  throw generatePrivateUser(newUser, false, false)
})
