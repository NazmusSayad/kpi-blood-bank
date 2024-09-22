import { appRoute } from '@/next-route'

export const GET = appRoute(async () => {
  const env = { ...process.env }
  delete env['DATABASE_URL']

  throw {
    message: 'Hello, world!',
    time: new Date(),
    env,
  }
})
