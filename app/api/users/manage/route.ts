import { authRouteAdmin } from '@/router/api'
import { UserAdminDBSelect } from '@/config'
import { findUsers } from '@/service/account/user'

export const GET = authRouteAdmin(async (req) => {
  const searchQuery = req.nextUrl.searchParams.get('search')
  const numberSearchQuery = searchQuery?.replace(/\D/g, '')

  const queryRole = req.nextUrl.searchParams.get('bloodGroup')
  const queryBloodGroup = req.nextUrl.searchParams.get('bloodGroup')
  const queryAccountType = req.nextUrl.searchParams.get('bloodGroup')

  const queryLimit = req.nextUrl.searchParams.get('limit')
  const queryCursor = req.nextUrl.searchParams.get('cursor')

  throw findUsers(
    {
      AND: [
        queryRole && { role: queryRole },
        queryBloodGroup && { bloodGroup: queryBloodGroup },
        queryAccountType && { accountType: queryAccountType },

        {
          OR: [
            numberSearchQuery && { id: +numberSearchQuery },
            numberSearchQuery && { bcNumber: numberSearchQuery },
            numberSearchQuery && { nidNumber: numberSearchQuery },

            searchQuery && { name: { contains: searchQuery, mode: 'insensitive' } },
            searchQuery && { email: { contains: searchQuery, mode: 'insensitive' } },
            searchQuery && { phone: { contains: searchQuery, mode: 'insensitive' } },
          ].filter(Boolean),
        },
      ].filter(Boolean) as any,
    },
    {
      select: UserAdminDBSelect,
      take: queryLimit ? +queryLimit : undefined,
      cursor: queryCursor ? { id: +queryCursor } : undefined,
      skip: queryCursor ? 1 : undefined,
    }
  )
})
