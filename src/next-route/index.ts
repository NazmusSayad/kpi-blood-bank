import { cookies } from 'next/headers'
import RouteWrapper from 'route-wrapper'
import { ErrorManager, ReqError } from 'req-error'
import { NextRequest, NextResponse } from 'next/server'

type NextRequestContext = Record<string, unknown> & {
  readonly params: Record<string, string>
  status: number
  token?: string
}

const errorManager = new ErrorManager()

export const appRoute = RouteWrapper<[NextRequest, NextRequestContext]>(
  (err, req, ctx) => {
    const [message, statusCode] = errorManager.getErrorInfo(err)
    return NextResponse.json({ message }, { status: statusCode })
  },

  (data, req, ctx) => {
    const status = ctx.status ? +ctx.status : 200
    return NextResponse.json({ data }, { status })
  }
).use((req, ctx) => {
  const token = cookies().get('token')
  ctx.token = token?.value
})

export const authRoute = appRoute.create().use((req, { token }) => {
  if (!token) {
    throw new ReqError('Unauthorized', 401)
  }
})
