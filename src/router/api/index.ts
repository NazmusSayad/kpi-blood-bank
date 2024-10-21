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
import config from '@/config'
import { userHasAccess } from '@/service/utils'

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
  req.getFormFile = () => null
  req.getAllFormFile = () => []

  try {
    const contentType = req.headers.get('content-type')

    if (contentType?.startsWith('application/json')) {
      req.data = await req.json()
    } else if (contentType?.startsWith('multipart/form-data')) {
      const formData = await req.formData()
      formData.forEach((value, key) => {
        if (value instanceof File) return
        req.data[key] = value
      })

      req.getFormFile = (key) => {
        const file = formData.get(key)
        if (file instanceof File) return file
        return null
      }

      req.getAllFormFile = (key) => {
        const files = formData.getAll(key)
        return files.filter((file) => file instanceof File)
      }
    }
  } catch {}

  req.authToken = req.headers.get(config.headerAuthTokenKey) ?? undefined
  req.cookieToken = cookies().get(config.cookieAuthTokenKey)?.value
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

export const authRouteMod = authRoute.create().use((req) => {
  if (!userHasAccess(req.user).moderator) {
    throw new ReqError('At least you have to be a moderator', 403)
  }
})

export const authRouteAdmin = authRoute.create().use((req) => {
  if (!userHasAccess(req.user).admin) {
    throw new ReqError('At least you have to be a admin', 403)
  }
})

export const authRouteSuperAdmin = authRoute.create().use((req) => {
  if (!userHasAccess(req.user).superAdmin) {
    throw new ReqError('Only SuperAdmin can do this', 403)
  }
})
