import r from 'rype'
import { BloodGroup, Prisma } from '@prisma/client'

const mainFields = {
  name: r.string(),
  password: r.string(),
  accountType: r.string('GUEST', 'TEACHER'),
  bloodGroup: r.string(...Object.values(BloodGroup)),
  phone: r.number().max(9999999999).min(1000000000),
} as const

const studentsFields = {
  accountType: r.string('STUDENT'),

  student_educationalInstitute: r.string().optional(),
  student_department: r.string().optional(),
  student_session: r.string().optional(),
  student_rollNumber: r.number().optional(),
  student_registrationNumber: r.number().optional(),

  nidNumber: r.number().optional(),
  birthCertificateNumber: r.number().optional(),
}

const userType = r.or(
  r.object({
    ...mainFields,
    nidNumber: r.number(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    birthCertificateNumber: r.number(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    nidNumber: r.number(),
  })
)

const userInstance = {} as r.inferOutput<typeof userType>
userInstance satisfies Omit<Prisma.UserCreateInput, 'role'>

export default userType
