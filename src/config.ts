import type { User } from '@prisma/client'

export const UserPublicFields = [
  'id',
  'name',
  'role',
  'accountType',
  'bloodGroup',
  'email',
  'avatar_url',

  'student_educationalInstitute',
  'student_department',
  'student_session',
] as const

export const UserPrivateFields = [
  ...UserPublicFields,
  'phone',
  'nidNumber',
  'birthCertificateNumber',
  'birthDate',
  'student_rollNumber',
  'student_registrationNumber',
] as const

export type PublicUser = Pick<User, (typeof UserPublicFields)[number]>
export type PrivateUser = Pick<User, (typeof UserPrivateFields)[number]>

export const UserPublicDBSelect = Object.fromEntries(
  UserPublicFields.map((field) => [field, true])
) as Record<(typeof UserPublicFields)[number], true>
