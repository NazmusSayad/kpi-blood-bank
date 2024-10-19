import { authRoute } from '@/router/api'
import { updateDonationStatus } from '@/service/blood/donate'

export const POST = authRoute((req, ctx) => {
  throw updateDonationStatus(
    req.user,
    ctx.params.id,
    'REJECTED',
    req.data.comment
  )
})
