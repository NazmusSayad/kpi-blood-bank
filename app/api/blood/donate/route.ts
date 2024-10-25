import { authRoute } from '@/router/api'
import { UserPublicDBSelect } from '@/config'
import { createDonation, getDonations } from '@/service/blood/donate'

export const GET = authRoute((req) => {
  throw getDonations({ userId: req.user.id }, { select: UserPublicDBSelect })
})

export const POST = authRoute((req) => {
  throw createDonation(req.user, req.data as any)
})
