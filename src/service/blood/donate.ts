import db from '../db'
import { ReqError } from 'req-error'
import { userHasAccess } from '../utils'
import { Prettify } from '@/utils/types.t'
import { UserAdminDBSelect, UserPublicDBSelect } from '@/config'
import { User, Prisma, BloodDonation, BloodDonationStatus } from '@prisma/client'

export async function getDonations(
  where: Prisma.BloodDonationWhereInput,
  options: {
    take?: number
    cursor?: number
    select?: typeof UserAdminDBSelect | typeof UserPublicDBSelect
  } = {}
) {
  const total = await db.bloodDonation.count({ where })
  const donations = await db.bloodDonation.findMany({
    where,
    take: options.take ?? 24,
    skip: options.cursor !== undefined ? 1 : 0,
    cursor: options.cursor ? { id: options.cursor } : undefined,
    include: options.select
      ? {
          user: { select: options.select },
          createdBy: { select: options.select },
          statusUpdatedBy: { select: options.select },
        }
      : undefined,
  })

  return { donations, total }
}

export async function createDonation(
  user: User,
  body: Prettify<Pick<BloodDonation, 'bloodGroup'> & Partial<Pick<BloodDonation, 'userId'>>>
) {
  if (body.userId != null && !userHasAccess(user).moderator) {
    throw new ReqError('You are not allowed to create donation for other users')
  }

  return db.bloodDonation.create({
    data: {
      ...body,
      createdById: user.id,
      userId: body.userId ?? user.id,
    },
    include: {
      user: { select: UserPublicDBSelect },
      createdBy: { select: UserPublicDBSelect },
      statusUpdatedBy: { select: UserPublicDBSelect },
    },
  })
}

export async function updateDonationStatus(
  user: User,
  id: number,
  status: BloodDonationStatus,
  reason: string
) {
  if (!status) throw new ReqError('Status is required')

  if (!userHasAccess(user).moderator) {
    throw new ReqError('You are not allowed to update blood donation status')
  }

  return db.bloodDonation.update({
    where: { id },
    data: {
      status,
      statusUpdatedAt: new Date(),
      statusUpdatedById: user.id,
      statusUpdateComment: reason,
    },
    include: {
      user: { select: UserPublicDBSelect },
      createdBy: { select: UserPublicDBSelect },
      statusUpdatedBy: { select: UserPublicDBSelect },
    },
  })
}

export async function deleteDonation(user: User, id: number) {
  if (!userHasAccess(user).admin) {
    throw new ReqError('You are not allowed to delete blood donation')
  }

  await db.bloodDonation.delete({ where: { id } })
}
