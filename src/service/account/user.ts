import db from '../db'
import { Prisma } from '@prisma/client'
import { UserPublicDBSelect } from '@/config'

export async function findUsers(options: Prisma.UserWhereInput) {
  return db.user.findMany({
    select: UserPublicDBSelect,
    where: {
      ...options,
    },
  })
}
