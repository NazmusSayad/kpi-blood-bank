import type { User } from '@prisma/client'

export const UserPublicFields = [
  'id',
  'createdAt',
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

export const UserAdminFields = [
  ...UserPublicFields,
  'phone',
  'nidNumber',
  'birthCertificateNumber',
  'student_rollNumber',
  'student_registrationNumber',
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
export type AdminUser = Pick<User, (typeof UserAdminFields)[number]>
export type PrivateUser = Pick<User, (typeof UserPrivateFields)[number]>

export const UserPublicDBSelect = Object.fromEntries(
  UserPublicFields.map((field) => [field, true])
) as Record<(typeof UserPublicFields)[number], true>

export const UserAdminDBSelect = Object.fromEntries(
  UserAdminFields.map((field) => [field, true])
) as Record<(typeof UserAdminFields)[number], true>

export default {
  defaultAvatar:
    'data:image/jpg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABAAEADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAABQYHAwQI/8QAKBAAAQQCAgICAQQDAAAAAAAAAQACAwQFEQYSITEiQRMHFFGBFTJx/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAEDAgT/xAAbEQACAwEBAQAAAAAAAAAAAAAAAQIRIQMxIv/aAAwDAQACEQMRAD8A85M2x3hbSxk6cfK0jYHtBRCtUE4DQfKnYhh/TmA2MxE3X2FcMrxqaaqTFGSS3+FIv06qPqcjg7H47C9NyctwmMgZFbkY2Tr9lOLthWEMp4OzA6cWYywDethA7FV8kjw5vxCrnK89jMpE40S3+lNr1jQc1rfJWZunSEIOdP4HFgHtLVmmHDbfZTpl6D5XF7x79IN/jJYwXu8tTTBMH1Kcj2gkaTFisTK7T4yh8bpGkaHxTjxiKSV7Gj0SsSwHgW43jnxWWTu33ajHKuH3OQhtqJ0jOo9BUfjfHaMFKOeyW9iN6R02akY/FC0dVqMG0W52nbPO9anNiCa8oeSPso3VZBZqu0NyhVfJ4nG29vliaCfvSWq/G6sd174XDp/CJcZJfIZLpc/CTZtjmNIf4P0uCNpdVId5Rvn8EkeUdHGPjvwlyvO+AH8o+KSTWMg8eDNV43C+uO2thFcbXiodQ3WwUFw+a767O8Ii6wJrDS12htE0bZRqFyexDG3Z6oxA0R+XHyhfGo+1RrzrQC7rDwCST/StHw6F4cXIMj+Cq9wOgAkjGctDLDjK/wCAKOcnDpsfN1B9KHZWyYGyxh2nbTk3GqJTlTHLnefqT22SQODifaVcldjkiHXXlLcMb5ZQ6R5P/VhkJniTqw+Apt3pJ02MmHkc0eSin710T26d9pTrZDqBpdkdozuASaNvS/cQyYfiWNLvOkbbqQ/7bKlXF7ro6zW9joJohz7Yj1aduVo4iq8G6/BF+wlDtbLV5s5hDHDlpup8bPhV/J8hJrybd9KGZ24bWVlO97KOmolNaDZbju3VnhYTSu32cfK2t1wwB49oZO4l2tqaRij/2Q==',

  cookieAuthTokenKey: 'authorization-jwt-token',
  headerAuthTokenKey: 'authorization',
} as const
