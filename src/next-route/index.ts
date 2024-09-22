import { ReqError } from 'req-error'
import { cookies } from 'next/headers'
import RouteWrapper from 'route-wrapper'
import { NextRequest, NextResponse } from 'next/server'
import { errorManager, NextRequestContext } from './helpers'

export const appRoute = RouteWrapper<[NextRequest, NextRequestContext]>(
  (err) => {
    const [message, statusCode] = errorManager.getErrorInfo(err)
    return NextResponse.json({ message }, { status: statusCode })
  },

  (data, _, ctx) => {
    const status = ctx.status ? +ctx.status : 200
    return NextResponse.json({ data }, { status })
  }
).use((_, ctx) => {
  const token = cookies().get('authorization')
  ctx.authorizationToken = token?.value
})

export const authRoute = appRoute.create().use((_, { authorizationToken }) => {
  if (!authorizationToken) {
    throw new ReqError('Authorization token is required', 401)
  }
})
