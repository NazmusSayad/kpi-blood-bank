import config from '@/config'
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nextPath = request.nextUrl.pathname
  const token = request.cookies.get(config.cookieAuthTokenKey)?.value

  if (isAuthRoute(nextPath) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isNonAuthRoute(nextPath) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

const isAuthRoute = genRouteController('/admin', '/blood')
const isNonAuthRoute = genRouteController('/auth/login', '/auth/register')
function genRouteController(...paths: string[]) {
  return (nextPath: string) => {
    for (const path of paths) {
      if (nextPath.toLowerCase().startsWith(path)) return true
    }

    return false
  }
}
