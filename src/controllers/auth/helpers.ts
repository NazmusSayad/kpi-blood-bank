import jwt from '@/utils/jwt'
import { ReqError } from 'req-error'

export function createAuthJwtToken(userId: number) {
  return jwt.create({ userId: userId })
}
export function parseAuthJwtToken(token: string) {
  return jwt.parse(token) as Promise<{ userId: number }>
}

export function createSignupJwtToken(data: unknown, code: string) {
  return jwt.create(data, {
    expiresIn: '10m',
    secret: process.env.JWT_SIGNUP_SECRET + '@' + code,
  })
}

export async function parseSignupJwtToken(token: string, code: string) {
  try {
    return await jwt.parse(token, {
      secret: process.env.JWT_SIGNUP_SECRET + '@' + code,
    })
  } catch (err) {
    if (err.name === 'JWSSignatureVerificationFailed') {
      throw new ReqError('Incorrect verification code provided', 401)
    }
    if (err.name === 'JWTExpired') {
      throw new ReqError('Verification code expired', 401)
    }
  }
}
