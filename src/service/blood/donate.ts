import {
  User,
  Prisma,
  BloodDonation,
  BloodDonationStatus,
} from '@prisma/client'
import db from '../db'
import { ReqError } from 'req-error'
import { userHasAccess } from '../utils'
import { Prettify } from '@/utils/types.t'
import { UserPublicDBSelect } from '@/config'

export async function getDonations(where: Prisma.BloodDonationWhereInput) {
  return db.bloodDonation.findMany({
    where,
    include: {
      user: { select: UserPublicDBSelect },
      createdBy: { select: UserPublicDBSelect },
      statusUpdatedBy: { select: UserPublicDBSelect },
    },
  })
}

export async function createDonation(
  user: User,
  body: Prettify<
    Pick<BloodDonation, 'bloodGroup'> & Partial<Pick<BloodDonation, 'userId'>>
  >
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
  id: string,
  status: BloodDonationStatus,
  reason: string
) {
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

export async function deleteDonation(user: User, id: string) {
  if (!userHasAccess(user).admin) {
    throw new ReqError('You are not allowed to delete blood donation')
  }

  await db.bloodDonation.delete({ where: { id } })
}
