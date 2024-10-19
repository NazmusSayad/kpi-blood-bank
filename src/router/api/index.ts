import {
  errorManager,
  NextRequestCustom,
  NextRequestContext,
  NextAuthRequestCustom,
} from './helpers'
import db from '@/service/db'
import { ReqError } from 'req-error'
import { cookies } from 'next/headers'
import RouteWrapper from 'route-wrapper'
import { NextResponse } from 'next/server'
import { parseAuthJwtToken } from '@/service/jwtHelpers'

export const appRoute = RouteWrapper<[NextRequestCustom, NextRequestContext]>(
  (err) => {
    const [message, statusCode] = errorManager.getErrorInfo(err)
    if (statusCode === 500) {
      console.error(err)
    }

    return NextResponse.json({ message }, { status: statusCode })
  },

  (data, _, ctx) => {
    const status = ctx.status ? +ctx.status : 200
    return NextResponse.json(data, { status })
  }
).use(async (req, ctx) => {
  req.data = {}

  try {
    const contentType = req.headers.get('content-type')

    if (contentType.startsWith('application/json')) {
      req.data = await req.json()
    } else if (
      contentType.startsWith('application/x-www-form-urlencoded') ||
      contentType.startsWith('multipart/form-data')
    ) {
      req.form_data = await req.formData()
    }
  } catch {}

  const token = cookies().get('authorization')
  ctx.authorizationToken = token?.value
})

export const authRoute = appRoute
  .create<[NextAuthRequestCustom, NextRequestContext]>()
  .use(async (req, ctx) => {
    if (!ctx.authorizationToken) {
      throw new ReqError('Authorization token is required', 401)
    }

    const userId = await parseAuthJwtToken(ctx.authorizationToken)
    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new ReqError('User not found', 404)
    }

    req.user = user
  })
