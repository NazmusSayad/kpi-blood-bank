import db from '../db'
import { Prisma } from '@prisma/client'
import { UserPublicDBSelect } from '@/config'

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
