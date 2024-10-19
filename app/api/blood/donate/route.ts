import { authRoute } from '@/router/api'
import { createDonation } from '@/service/blood/donate'

export const POST = authRoute((req) => {
  throw createDonation(req.user, req.data as any)
})
