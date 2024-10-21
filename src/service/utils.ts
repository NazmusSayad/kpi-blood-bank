import { User, UserRole } from '@prisma/client'

export function userAccess(user: Pick<User, 'role'>) {
  const isSuperAdmin = user.role === UserRole.SUPER_ADMIN
  const isAdmin = isSuperAdmin || user.role === UserRole.ADMIN
  const isModerator = isAdmin || user.role === UserRole.MODERATOR
  const isMember = isModerator || user.role === UserRole.MEMBER
  return {
    isMember,
    isModerator,
    isAdmin,
    isSuperAdmin,
  }
}
