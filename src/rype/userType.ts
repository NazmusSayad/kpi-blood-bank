import { r } from 'rype'
import { Prisma, BloodGroup } from '@prisma/client'

const NameString = r.string().transform((v) => v.replaceAll(/\W|\d/g, ' ').trim())
const NidNumberString = r.string().regex(/^\d+$/)
const BirthCertificateString = r.string().regex(/^\d+$/)
const PhoneString = r
  .string()
  .regex(/^\+8801[0-9]{9}$/)
  .typeErr('Invalid phone number')
const EmailString = r
  .string()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .typeErr('Invalid email address')

const userMainType = {
  name: NameString,
  password: r.string().minLength(6),
  accountType: r.string('GUEST', 'TEACHER'),
  bloodGroup: r.string(...Object.values(BloodGroup)).typeErr('Invalid blood group'),

  phone: PhoneString,
  email: EmailString.optional(),

  nidNumber: NidNumberString.optional(),
  bcNumber: BirthCertificateString.optional(),
} as const

const studentsFields = {
  accountType: r.string('STUDENT'),
  student_educationalInstitute: r.string().optional(),
  student_department: r.string().optional(),
  student_session: r.string().optional(),
  student_rollNumber: r.string().optional(),
  student_registrationNumber: r.string().optional(),
}

export const userType = r.or(
  r.object({
    ...userMainType,
    nidNumber: NidNumberString,
  }),
  r.object({
    ...userMainType,
    ...studentsFields,
    nidNumber: NidNumberString,
  }),
  r.object({
    ...userMainType,
    ...studentsFields,
    bcNumber: BirthCertificateString,
  })
)

export const modifiableUserType = r
  .object({
    name: NameString,
    email: EmailString,
    student_educationalInstitute: studentsFields.student_educationalInstitute,
    student_department: studentsFields.student_department,
    student_session: studentsFields.student_session,
    student_rollNumber: studentsFields.student_rollNumber,
    student_registrationNumber: studentsFields.student_registrationNumber,
  })
  .partial()

const userInstance = {} as r.inferOutput<typeof userType>
userInstance satisfies Omit<Prisma.UserCreateInput, 'role'>

const modifiableUserInstance = {} as r.inferOutput<typeof modifiableUserType>
modifiableUserInstance satisfies Omit<Prisma.UserUpdateInput, 'role'>
