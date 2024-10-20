import { UserPublicDBSelect } from '@/config'
import db, { Prisma } from '../db'

export async function findUsers(options: Prisma.UserWhereInput) {
  return db.user.findMany({
    select: UserPublicDBSelect,
    where: {
      ...options,
    },
  })
}
