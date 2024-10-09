import { authRoute } from '@/next-route'

export const GET = authRoute(async (req) => {
  console.log(req.user)
  throw { message: 'Hello, world!' }
})
