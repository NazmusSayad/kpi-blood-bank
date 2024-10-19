import db from '../db'
import { ReqError } from 'req-error'
import { userAccess } from '../utils'
import { Prettify } from '@/utils/types.t'
import { UserPublicDBSelect } from '@/config'
import { BloodDonation, BloodDonationStatus, User } from '@prisma/client'

export async function createDonation(
  user: User,
  body: Prettify<
    Pick<BloodDonation, 'bloodGroup'> & Partial<Pick<BloodDonation, 'userId'>>
  >
) {
  if (body.userId != null && !userAccess(user).isModerator) {
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
  if (!userAccess(user).isModerator) {
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
  if (!userAccess(user).isAdmin) {
    throw new ReqError('You are not allowed to delete blood donation')
  }

  await db.bloodDonation.delete({ where: { id } })
}
