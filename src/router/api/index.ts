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
import { parseAuthJwtToken, parseCookieJwtToken } from '@/service/jwtHelpers'

export const appRoute = RouteWrapper<[NextRequestCustom, NextRequestContext]>(
  (err) => {
    const [message, statusCode] = errorManager.getErrorInfo(err)
    if (statusCode === 500) {
      console.error(err)
    }

    return NextResponse.json({ message }, { status: statusCode })
  },

  (data, req, ctx) => {
    const status = ctx.status ? +ctx.status : 200
    return NextResponse.json(data, { status })
  }
).use(async (req) => {
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

  req.authToken = req.headers.get('authorization')
  req.cookieToken = cookies().get('authorization')?.value
})

export const cookieAuthRoute = appRoute
  .create<[NextAuthRequestCustom, NextRequestContext]>()
  .use(async (req) => {
    if (!req.cookieToken) {
      throw new ReqError('Authorization cookie token is required', 401)
    }

    const userId = await parseCookieJwtToken(req.cookieToken)
    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new ReqError('User not found', 404)
    }

    req.user = user
  })

export const authRoute = appRoute
  .create<[NextAuthRequestCustom, NextRequestContext]>()
  .use(async (req) => {
    if (!req.authToken) {
      throw new ReqError('Authorization token is required', 401)
    }

    const jwtToken = req.authToken.split('Bearer ')[1]
    const userId = await parseAuthJwtToken(jwtToken)
    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new ReqError('User not found', 404)
    }

    req.user = user
  })
