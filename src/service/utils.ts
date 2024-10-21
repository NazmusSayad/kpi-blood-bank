import { User, UserRole } from '@prisma/client'

export function userHasAccess(user: Pick<User, 'role'>) {
  const superAdmin = user.role === UserRole.SUPER_ADMIN
  const admin = superAdmin || user.role === UserRole.ADMIN
  const moderator = admin || user.role === UserRole.MODERATOR
  return { moderator, admin, superAdmin } as
    | {
        superAdmin: true
        admin: true
        moderator: true
      }
    | {
        superAdmin: false
        admin: true
        moderator: true
      }
    | {
        superAdmin: false
        admin: false
        moderator: true
      }
    | {
        superAdmin: false
        admin: false
        moderator: false
      }
}
