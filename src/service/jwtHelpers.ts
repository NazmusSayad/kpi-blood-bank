import r from 'rype'
import jwt from '@/utils/jwt'
import { ReqError } from 'req-error'
import userType from '@/rype/userType'

export function createAuthJwtToken(userId: number) {
  return jwt.create({ userId: userId }, { secret: '@AUTH' })
}
export async function parseAuthJwtToken(token: string): Promise<number> {
  return (await jwt.parse(token, { secret: '@AUTH' })).userId
}

export function createCookieJwtToken(userId: number) {
  return jwt.create({ userId: userId }, { secret: '@COOKIE' })
}
export async function parseCookieJwtToken(token: string): Promise<number> {
  return (await jwt.parse(token, { secret: '@COOKIE' })).userId
}

export function createSignupJwtToken(data: unknown, code: string) {
  return jwt.create(
    { data },
    {
      expiresIn: '10d',
      secret: '@SIGNUP@' + code,
    }
  )
}

export async function parseSignupJwtToken(
  token: string,
  code: string
): Promise<r.inferOutput<typeof userType>> {
  try {
    return (await jwt.parse(token, { secret: '@SIGNUP@' + code })).data
  } catch (err) {
    if (
      err.name === 'JWSSignatureVerificationFailed' ||
      err.name === 'JWSInvalid'
    ) {
      throw new ReqError('Incorrect verification code provided', 401)
    }
    if (err.name === 'JWTExpired') {
      throw new ReqError('Verification code expired', 401)
    }

    throw err
  }
}

export function createForgetPassJwtToken(userId: number, code: string) {
  return jwt.create(
    { userId },
    {
      expiresIn: '10d',
      secret: '@FORGET@' + code,
    }
  )
}

export async function parseForgetPassJwtToken(
  token: string,
  code: string
): Promise<number> {
  try {
    return (await jwt.parse(token, { secret: '@FORGET@' + code })).userId
  } catch (err) {
    if (
      err.name === 'JWSSignatureVerificationFailed' ||
      err.name === 'JWSInvalid'
    ) {
      throw new ReqError('Incorrect verification code provided', 401)
    }

    if (err.name === 'JWTExpired') {
      throw new ReqError('Verification code expired', 401)
    }

    throw err
  }
}
