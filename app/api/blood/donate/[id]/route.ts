import { authRouteSuperAdmin } from '@/router/api'
import { deleteDonation } from '@/service/blood/donate'

export const DELETE = authRouteSuperAdmin(async (req, ctx) => {
  await deleteDonation(req.user, ctx.params.id)
  throw { deleted: true }
})
