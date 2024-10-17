import {
  createAuthJwtToken,
  parseForgetPassJwtToken,
  createForgetPassJwtToken,
} from '../jwtHelpers'
import db from '@/db'
import argon2 from '@/utils/argon2'
import { ReqError } from 'req-error'
import _printOTP from '@/utils/_printOTP'
import generateOtp from '@/utils/generateOtp'

export async function forgetPassword(phone: number) {
  if (!phone) {
    throw new ReqError('Missing required fields', 400)
  }

  const user = await db.user.findFirst({ where: { phone } })
  if (!user) {
    throw new ReqError('User not found', 404)
  }

  const otp = generateOtp()
  _printOTP('Forget Password', otp)
  const token = await createForgetPassJwtToken(user.id, otp)
  return { token }
}

export async function resetPassword(
  token: string,
  password: string,
  otp: string
) {
  if (!token || !otp || !password) {
    throw new ReqError('Missing required fields', 400)
  }

  if (password?.length < 6) {
    throw new ReqError('Password must be at least 6 characters', 400)
  }

  const userId = await parseForgetPassJwtToken(token, otp)

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new ReqError('User not found', 404)
  }

  const newUser = await db.user.update({
    where: { id: userId },
    data: { password: await argon2.generate(password) },
  })

  return {
    user: newUser,
    jwtToken: await createAuthJwtToken(newUser.id),
  }
}
