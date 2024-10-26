import db from '../db'
import { Prisma, User } from '@prisma/client'
import { UserPublicDBSelect } from '@/config'

export async function getRequests(where: Prisma.BloodRequestWhereInput) {
  return await db.bloodRequest.findMany({
    where,
    include: {
      user: {
        select: UserPublicDBSelect,
      },
      createdBy: {
        select: UserPublicDBSelect,
      },
    },
  })
}

export async function createRequest(
  user: User,
  data: Pick<Prisma.BloodRequestCreateInput, 'bloodGroup' | 'amount'> & {
    userId?: number
  }
) {
  return await db.bloodRequest.create({
    data: {
      ...data,
      createdById: user.id,
      userId: data.userId ?? user.id,
    },

    include: {
      user: {
        select: UserPublicDBSelect,
      },
      createdBy: {
        select: UserPublicDBSelect,
      },
    },
  })
}
