import { authRouteAdmin } from '@/router/api'
import { userHasAccess } from '@/service/utils'
import { generateAdminUser } from '@/service/helpers'
import { updateUserAdmin } from '@/service/account/user'

export const PATCH = authRouteAdmin(async (req, ctx) => {
  const { id } = ctx.params
  const { bloodGroup, accountType, role } = req.data

  const newUser = await updateUserAdmin(Number(id), {
    role: userHasAccess(req.user).superAdmin ? role : undefined,
    accountType,
    bloodGroup,
  })

  throw generateAdminUser(newUser)
})
