import { authRoute } from '@/router/api'
import { createDonation, getDonations } from '@/service/blood/donate'

export const GET = authRoute((req) => {
  throw getDonations({ userId: req.user.id })
})

export const POST = authRoute((req) => {
  throw createDonation(req.user, req.data as any)
})
