import { authRoute } from '@/router/api'
import { deleteDonation } from '@/service/blood/donate'

export const DELETE = authRoute(async (req, ctx) => {
  await deleteDonation(req.user, ctx.params.id)
  throw { deleted: true }
})
