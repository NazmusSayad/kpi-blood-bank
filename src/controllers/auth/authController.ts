import {
  createAuthJwtToken,
  createSignupJwtToken,
  parseSignupJwtToken,
} from './helpers'
import r from 'rype'
import db from '@/db'
import { ReqError } from 'req-error'
import userType from '@/rype/userType'
import { UserPrivateFields } from '@/db/config'
import { createSelectionObj } from '@/db/helpers'

export async function login(password: string, id: number, phone: number) {
  if (!(id || phone) || !password) {
    throw new ReqError('UserId or Phone and Password are required', 400)
  }

  const user = await db.user.findFirst({
    where: { OR: [{ id }, { phone }] },
  })

  if (!user) {
    throw new ReqError('User not found', 404)
  }

  if (user.password !== password) {
    throw new ReqError('Password not matched', 400)
  }

  return { user, jwtToken: await createAuthJwtToken(user.id) }
}

export async function createSignupToken(data: unknown) {
  const user = userType.parse(data, 'user')
  const existedUser = await db.user.findFirst({
    where: {
      OR: [
        { phone: user.phone },
        { nidNumber: user.nidNumber },
        user.accountType === 'STUDENT' && {
          birthCertificateNumber: user.birthCertificateNumber,
        },
        user.accountType === 'STUDENT' && {
          student_rollNumber: user.student_rollNumber,
          student_registrationNumber: user.student_registrationNumber,
        },
      ].filter(Boolean),
    },
  })

  let existedKey = []
  if (existedUser) {
    if (existedUser.phone === user.phone) existedKey.push('Phone number')
    if (existedUser.nidNumber === user.nidNumber) existedKey.push('NID number')

    if (user.accountType === 'STUDENT') {
      if (existedUser.birthCertificateNumber === user.birthCertificateNumber) {
        existedKey.push('Birth certificate number')
      }

      if (
        existedUser.student_rollNumber === user.student_rollNumber &&
        existedUser.student_registrationNumber ===
          user.student_registrationNumber
      ) {
        existedKey.push('Roll number and registration number')
      }
    }
  }

  if (existedKey.length) {
    throw new ReqError(existedKey.join(', ') + ' already used', 400)
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  console.log('> OTP:', otp)
  return createSignupJwtToken(user, otp)
}

export async function confirmSignUp(token: string, otp: string) {
  const data = (await parseSignupJwtToken(
    token as string,
    otp
  )) as r.inferOutput<typeof userType>

  const user = await db.user.create({
    data: {
      ...data,
      role: 'USER',
    },

    select: createSelectionObj(...UserPrivateFields),
  })

  return { user, jwtToken: await createAuthJwtToken(user.id) }
}
