import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nextPath = request.nextUrl.pathname
  const authorization = request.cookies.get('authorization')?.value

  if (isAuthRoute(nextPath) && !authorization) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isNonAuthRoute(nextPath) && authorization) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return NextResponse.next()
}

const isAuthRoute = genRouteController('/admin', '/account')
const isNonAuthRoute = genRouteController('/login', '/register')
function genRouteController(...paths: string[]) {
  return (nextPath: string) => {
    for (const path of paths) {
      if (nextPath.toLowerCase().startsWith(path)) return true
    }

    return false
  }
}
