import { authRouteMod } from '@/router/api'
import { updateDonationStatus } from '@/service/blood/donate'

export const POST = authRouteMod((req, ctx) => {
  throw updateDonationStatus(
    req.user,
    ctx.params.id,
    'COMPLETED',
    req.data.comment
  )
})
