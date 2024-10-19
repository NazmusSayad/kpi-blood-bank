export const UserPublicFields = [
  'id',
  'name',
  'role',
  'accountType',
  'bloodGroup',
  'email',
  'student_educationalInstitute',
  'student_department',
  'student_session',

  'avatar_fileId',
  'avatar_url',
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
