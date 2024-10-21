import { ReqError } from 'req-error'
import { authRoute } from '@/router/api'
import { deleteDonation } from '@/service/blood/donate'

export const DELETE = authRoute(async (req, ctx) => {
  throw new ReqError('This action is not allowed at the moment', 405)

  await deleteDonation(req.user, ctx.params.id)
  throw { deleted: true }
})
