import { authRouteMod, authRouteSuperAdmin } from '@/router/api'
import { deleteDonation, updateDonationStatus } from '@/service/blood/donate'

export const PATCH = authRouteMod(async (req, ctx) => {
  const { status, comment } = req.data
  throw updateDonationStatus(req.user, +ctx.params.id, status, comment)
})

export const DELETE = authRouteSuperAdmin(async (req, ctx) => {
  await deleteDonation(req.user, +ctx.params.id)
  throw { deleted: true }
})
