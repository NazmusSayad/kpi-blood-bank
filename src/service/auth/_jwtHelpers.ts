import userType from '@/rype/userType'
import jwt from '@/utils/jwt'
import { ReqError } from 'req-error'
import r from 'rype'

export function createAuthJwtToken(userId: number) {
  return jwt.create({ userId: userId })
}
export async function parseAuthJwtToken(token: string): Promise<number> {
  return ((await jwt.parse(token)) as any)?.userId
}

export function createSignupJwtToken(data: unknown, code: string) {
  return jwt.create(
    { data },
    {
      expiresIn: '10m',
      secret: process.env.JWT_SIGNUP_SECRET + '@SIGNUP@' + code,
    }
  )
}

export async function parseSignupJwtToken(
  token: string,
  code: string
): Promise<r.inferOutput<typeof userType>> {
  try {
    return (
      (await jwt.parse(token, {
        secret: process.env.JWT_SIGNUP_SECRET + '@SIGNUP@' + code,
      })) as any
    ).data
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
      expiresIn: '10m',
      secret: process.env.JWT_FORGET_PASS_SECRET + '@FORGET@' + code,
    }
  )
}

export async function parseForgetPassJwtToken(
  token: string,
  code: string
): Promise<number> {
  try {
    return (
      (await jwt.parse(token, {
        secret: process.env.JWT_FORGET_PASS_SECRET + '@FORGET@' + code,
      })) as any
    )?.userId
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
