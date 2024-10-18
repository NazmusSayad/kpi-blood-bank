import r from 'rype'
import { BloodGroup, Prisma } from '@prisma/client'

const mainFields = {
  name: r.string(),
  password: r.string().minLength(6),
  accountType: r.string('GUEST', 'TEACHER'),
  bloodGroup: r.string(...Object.values(BloodGroup)),
  phone: r.number().max(999999999).min(100000000),
} as const

const studentsFields = {
  accountType: r.string('STUDENT'),

  student_educationalInstitute: r.string().optional(),
  student_department: r.string().optional(),
  student_session: r.string().optional(),
  student_rollNumber: r.string().optional(),
  student_registrationNumber: r.string().optional(),

  nidNumber: r.string().optional(),
  birthCertificateNumber: r.string().optional(),
}

const userType = r.or(
  r.object({
    ...mainFields,
    nidNumber: r.string(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    birthCertificateNumber: r.string(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    nidNumber: r.string(),
  })
)

const userInstance = {} as r.inferOutput<typeof userType>
userInstance satisfies Omit<Prisma.UserCreateInput, 'role'>

export default userType
