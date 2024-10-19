import { cookies } from 'next/headers'

export function setAuthCookie(token: string) {
  cookies().set('authorization', token, {
    httpOnly: true,
    secure: true,
  })
}
