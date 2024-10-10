import { appRoute } from '@/next-route'

export const GET = appRoute(() => {
  throw {
    time: new Date(),
    message: 'Hello, world!',
  }
})
