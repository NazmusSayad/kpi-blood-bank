import db from '../db'
import { Prisma } from '@prisma/client'
import { UserPublicDBSelect } from '@/config'

export async function findUsers(
  where: Prisma.UserWhereInput,
  options: Partial<{ select: Prisma.UserSelect }> = {}
) {
  return db.user.findMany({
    select: options.select ?? UserPublicDBSelect,
    where: {
      ...where,
    },
  })
}
