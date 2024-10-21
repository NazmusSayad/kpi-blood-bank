import { authRoute } from '@/router/api'
import { createRequest, getRequests } from '@/service/blood/request'

export const GET = authRoute((req) => {
  throw getRequests({ userId: req.user.id })
})

export const POST = authRoute((req) => {
  const { bloodGroup, amount } = req.data
  throw createRequest(req.user, { bloodGroup, amount })
})
