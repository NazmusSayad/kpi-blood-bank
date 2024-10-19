import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export function GET() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      console.log('Deleting cookie:', cookie.name)
      cookies().delete(cookie.name)
    })

  return NextResponse.json({ success: true })
}
