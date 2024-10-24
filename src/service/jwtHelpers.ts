import r from 'rype'
import env from '@/env'
import jwt from '@/utils/jwt'
import { ReqError } from 'req-error'
import userType from '@/rype/userType'

const AUTH_SECRET = '@AUTH'
const COOKIE_SECRET = '@COOKIE'
const SIGNUP_SECRET = (code: string) =>
  '@SIGNUP@' + (env['UNSAFE___DEV___USE_FIXED_OTP'] ?? code)
const FORGET_SECRET = (code: string) =>
  '@FORGET@' + (env['UNSAFE___DEV___USE_FIXED_OTP'] ?? code)

export function createAuthJwtToken(userId: number) {
  return jwt.create({ userId: userId }, { secret: AUTH_SECRET })
}
export async function parseAuthJwtToken(token: string): Promise<number> {
  return (await jwt.parse(token, { secret: AUTH_SECRET })).userId
}

export function createCookieJwtToken(userId: number) {
  return jwt.create({ userId: userId }, { secret: COOKIE_SECRET })
}
export async function parseCookieJwtToken(token: string): Promise<number> {
  return (await jwt.parse(token, { secret: COOKIE_SECRET })).userId
}

export function createSignupJwtToken(data: unknown, code: string) {
  return jwt.create(
    { data },
    {
      expiresIn: '10d',
      secret: SIGNUP_SECRET(code),
    }
  )
}

export async function parseSignupJwtToken(
  token: string,
  code: string
): Promise<r.inferOutput<typeof userType>> {
  try {
    return (await jwt.parse(token, { secret: SIGNUP_SECRET(code) })).data
  } catch (err: any) {
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
      secret: FORGET_SECRET(code),
    }
  )
}

export async function parseForgetPassJwtToken(
  token: string,
  code: string
): Promise<number> {
  try {
    return (await jwt.parse(token, { secret: FORGET_SECRET(code) })).userId
  } catch (err: any) {
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
