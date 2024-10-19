import { RypeClientError } from 'rype'
import { ErrorManager } from 'req-error'
import { NextRequest } from 'next/server'
import { User } from '@prisma/client'

export const errorManager = new ErrorManager({
  handlers: [
    (err) => {
      if (err instanceof RypeClientError) return [err.message, 400]

      if (err.name === 'JWTExpired') return ['Token expired', 401]
      if (err.name === 'JWSSignatureVerificationFailed') {
        return ['Invalid token', 401]
      }

      if (err.code === 'P2002') {
        return [
          err.meta.target.join(',') +
            ' already exists for ' +
            err.meta.modelName,
          400,
        ]
      }
    },
  ],
})

export type NextRequestCustom = NextRequest & {
  data: Record<string, any>
  getFormFile(key: string): File | null
  getAllFormFile(key: string): File[]
  authToken?: string
  cookieToken?: string
}

export type NextAuthRequestCustom = NextRequestCustom & {
  user: User
}

export type NextRequestContext = Record<string, unknown> & {
  readonly params: Record<string, string>
  status: number
}
