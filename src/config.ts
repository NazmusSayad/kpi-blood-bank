import type { BloodDonation, User } from '@prisma/client'

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
export type PollutedBloodDonation = BloodDonation & {
  user: AdminUser
  createdBy: AdminUser
  statusUpdatedBy: AdminUser
}

export const UserPublicDBSelect = Object.fromEntries(
  UserPublicFields.map((field) => [field, true])
) as Record<(typeof UserPublicFields)[number], true>

export const UserAdminDBSelect = Object.fromEntries(
  UserAdminFields.map((field) => [field, true])
) as Record<(typeof UserAdminFields)[number], true>

export default {
  defaultAvatar:
    'data:image/jpg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABAAEADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAABQYHCAMBBP/EACsQAAEDBAEEAQMEAwAAAAAAAAECAwQABQYREgchMUETFFFhFSIycSMkgf/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBAUB/8QAHxEAAgIDAQADAQAAAAAAAAAAAQIAEQMSIQQFEyIU/9oADAMBAAIRAxEAPwDPS/gZlA9iKOx3WFcVJ0KRy8pXk0Xtz6vjSFb80eTHYk5WhHV6wLkx/qQ2VJ15AoZG1HeLSgRWhukFqh3XFw3JQlW0+TQ7K+nVuTP5taB3vtUJejqY3+ZnGwkXiRnTI5aPA12utskGOVtIKt+hVitmEx3NIBAAo/Cw9hlYDiQtAoPvpo3H5WA7Mmy8cnhCnnGVJHnuKAutqbWUqGiK2tmeLQzjTq2mUhSUnwKyNkUMMzHvWlGtHzej7ZzJj+s0YHRHXzAUCKfcfx0SYiVbHI0ovTEuubQnRp2wBUuTPaRs/Hsdq7m2K2ORJG3DL5gPKxWBCdHZpwdMV+CZTw5K14rna7c2vH0gJBXxolYbc39KpEkb/FZRom5oouq1FaDJRJdWG0ltI90Zt61FRSlQWKG5G1+lvLLbemT7FJEDJH4l8SG1cmVK7iuFNurGoxA7K7dopcx2UFjf7TWIs6Hx3yS340s1tu+XdiLiTkp0gJU34/5WHMzmJn3+U83/ABKjqrvj1NkyX0mzc+Rq1PDuEnVOGByH4txbbSNkmg0e9f6pQWzy/qmDAC45cC8WyQPxT3YlTsJnruWAml8WvQbZaYcAJIG90+xAy6kFOtn7Vn+1TnEzitawlPrdN9oyh2G9/lXtG+3es5krompRhLqXchEQWHQAlXbZqbWCLEeuSD8yTtW9bpi6vF692dt6GTy15FKPT/FpIUh+S8Qre+5oqAS7hoe1KT1EhLm4wiNHd0nj6NZ2lYFIceUGhyUTVr6hPS4VtSGXCQBU2tGVOwXiZI2fzTPNmdF/Mk9BAejC1rwCLJRzLY1/VMKLBCx+CpSUDmRT3GZaiMaAGqRM+uSU6QD2oQ7ZDUeVC9iBfJkgTElkkJ36pihS1OsNJcOvuaXJc5ppKVugEbrvJurbsJAjfyP2qkpYAqBt2WOMlifjCmo6gt5IpcxuJcnJpb5FKUq8UF6e3tVukBiQoku+jVFaWIMv6rsEq71FktLWPTvZyybHnZ0VLa199UhT+m7il8jVBut5MhSVsK8eq9VJmOxwpAJoEJA5OZMYJ/U//9k=',

  cookieAuthTokenKey: 'authorization-jwt-token',
  headerAuthTokenKey: 'authorization',
} as const
