import { r } from 'rype'
import { Prisma, BloodGroup } from '@prisma/client'

const NidString = r.string().regex(/^\d+$/)
const BirthCertificateString = r.string().regex(/^\d+$/)

const mainFields = {
  name: r.string(),
  password: r.string().minLength(6),
  accountType: r.string('GUEST', 'TEACHER'),
  bloodGroup: r.string(...Object.values(BloodGroup)).typeErr('Invalid blood group'),

  email: r
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .typeErr('Invalid email'),
  phone: r
    .string()
    .regex(/^\+8801[0-9]{9}$/)
    .typeErr('Invalid phone number'),

  nidNumber: NidString.optional(),
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

const userType = r.or(
  r.object({
    ...mainFields,
    nidNumber: NidString.clone(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    nidNumber: NidString.clone(),
  }),
  r.object({
    ...mainFields,
    ...studentsFields,
    bcNumber: BirthCertificateString.clone(),
  })
)

export const modifiableUserType = r
  .object({
    name: r.string(),
    email: r.string(),
    student_educationalInstitute: studentsFields.student_educationalInstitute,
    student_department: studentsFields.student_department,
    student_session: studentsFields.student_session,
    student_rollNumber: studentsFields.student_rollNumber,
    student_registrationNumber: studentsFields.student_registrationNumber,
  })
  .partial()

const userInstance = {} as r.inferOutput<typeof userType>
userInstance satisfies Omit<Prisma.UserCreateInput, 'role'>
export default userType
