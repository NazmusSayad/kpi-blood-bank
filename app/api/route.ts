import db from '@/db'
import { appRoute } from '@/next-route'

export const GET = appRoute(async () => {
  const env = { ...process.env }
  delete env['DATABASE_URL']

  throw {
    message: 'Hello, world!',
    donors: await db.donationDonors.findMany(),
    time: new Date(),
    env: { ...process.env },
  }
})
