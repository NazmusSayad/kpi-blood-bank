import r from 'rype'
import db from '../db'
import { UserPublicDBSelect } from '@/config'
import { modifiableUserType } from '@/rype/userType'
import { AccountType, BloodGroup, Prisma, UserRole } from '@prisma/client'

export async function findUsers(
  where: Prisma.UserWhereInput,
  options: Prisma.UserFindManyArgs = {}
) {
  const total = await db.user.count({})
  const users = await db.user.findMany({
    ...options,
    where: { ...where },
    take: options.take ?? 24,
    select: options.select ?? UserPublicDBSelect,
  })

  return { total, users }
}

export async function updateUser(userId: number, body: r.inferInput<typeof modifiableUserType>) {
  const parsedBody = modifiableUserType.parse(body)
  return await db.user.update({
    where: { id: userId },
    data: parsedBody,
  })
}

export async function updateUserAdmin(
  userId: number,
  data: Partial<{ role: UserRole; bloodGroup: BloodGroup; accountType: AccountType }>
) {
  return await db.user.update({
    where: { id: userId },
    data: data,
  })
}
