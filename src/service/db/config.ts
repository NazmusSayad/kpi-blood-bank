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
