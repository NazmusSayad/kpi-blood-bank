import r from 'rype'
import db from '../db'
import { Prisma } from '@prisma/client'
import { UserPublicDBSelect } from '@/config'
import { modifiableUserType } from '@/rype/userType'

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
