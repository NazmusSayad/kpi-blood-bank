import db from '@/db'
import { appRoute } from '@/next-route'

export const GET = appRoute(async (req) => {
  throw {
    data: 'Hello, world!',
    time: new Date(),
    donors: await db.donationDonors.findMany(),
  }
})
