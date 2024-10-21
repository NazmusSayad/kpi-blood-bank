import config from '@/config'
import { cookies } from 'next/headers'

export function setAuthCookie(token: string) {
  cookies().set(config.cookieAuthTokenKey, token, {
    httpOnly: true,
    secure: true,
  })
}
