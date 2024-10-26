import db from '@/service/db'
import argon2 from '@/utils/argon2'
import { ReqError } from 'req-error'
import userType from '@/rype/userType'
import _printOTP from '@/service/sendOtp'
import generateOtp from '@/utils/generateOtp'
import { createSignupJwtToken, parseSignupJwtToken } from '../jwtHelpers'

export async function login(password: string, id: number, phone: string) {
  console.log('login', password, id, phone)
  if (!(id || phone) || !password) {
    throw new ReqError('UserId or Phone and Password are required', 400)
  }

  const user = await db.user.findFirst({
    where: { OR: [{ id }, { phone }] },
  })

  if (!user) {
    throw new ReqError('User not found', 404)
  }

  if (!(await argon2.check(user.password, password))) {
    throw new ReqError('Incorrect password entered', 400)
  }

  return user
}

export async function createSignupToken(data: unknown) {
  const user = userType.parse(data, 'user')
  const existedUser = await db.user.findFirst({
    where: {
      OR: [
        { phone: user.phone },
        { nidNumber: user.nidNumber },
        user.bcNumber && {
          bcNumber: user.bcNumber,
        },
        user.accountType === 'STUDENT' && {
          student_rollNumber: user.student_rollNumber,
          student_registrationNumber: user.student_registrationNumber,
        },
      ].filter(Boolean) as any,
    },
  })

  let existedKey: string[] = []
  if (existedUser) {
    if (existedUser.phone === user.phone) existedKey.push('Phone number')
    if (existedUser.nidNumber === user.nidNumber) existedKey.push('NID number')

    if (user.accountType === 'STUDENT') {
      if (existedUser.bcNumber === user.bcNumber) {
        existedKey.push('Birth certificate number')
      }

      if (
        existedUser.student_rollNumber === user.student_rollNumber &&
        existedUser.student_registrationNumber === user.student_registrationNumber
      ) {
        existedKey.push('Roll number and registration number')
      }
    }
  }

  if (existedKey.length) {
    throw new ReqError(existedKey.join(', ') + ' already exists', 400)
  }

  const otp = generateOtp()
  _printOTP('Signup', otp)
  return createSignupJwtToken(user, otp)
}

export async function confirmSignUp(token: string, otp: string) {
  const data = await parseSignupJwtToken(token, otp)
  return db.user.create({
    data: {
      ...data,
      role: 'MEMBER',
      password: await argon2.generate(data.password),
    },
  })
}
