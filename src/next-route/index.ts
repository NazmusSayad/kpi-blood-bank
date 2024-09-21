import { cookies } from 'next/headers'
import RouteWrapper from 'route-wrapper'
import { ErrorManager, ReqError } from 'req-error'
import { NextRequest, NextResponse } from 'next/server'

type NextRequestContext = Record<string, unknown> & {
  readonly params: Record<string, string>
  status: number
}

const errorManager = new ErrorManager()

export const appRoute = RouteWrapper<[NextRequest, NextRequestContext]>(
  (err, req, ctx) => {
    console.log({ err })

    const [message, statusCode] = errorManager.getErrorInfo(err)
    return NextResponse.json({ message }, { status: statusCode })
  },

  (data, req, ctx) => {
    const status = ctx.status ? +ctx.status : 200
    return NextResponse.json({ data }, { status })
  }
)

export const authRoute = appRoute.create().use(() => {
  const token = cookies().get('token')

  if (!token) {
    throw new ReqError('Unauthorized', 401)
  }
})
