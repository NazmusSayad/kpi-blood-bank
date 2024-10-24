import { BloodGroup } from '@prisma/client'
import { authRouteAdmin } from '@/router/api'
import { UserAdminDBSelect } from '@/config'
import { findUsers } from '@/service/account/user'

export const GET = authRouteAdmin(async (req) => {
  const queryBloodGroup = req.nextUrl.searchParams.get('bloodGroup')
  const queryLimit = req.nextUrl.searchParams.get('limit')
  const queryCursor = req.nextUrl.searchParams.get('cursor')

  const searchQuery = req.nextUrl.searchParams.get('search')
  const idQuery = searchQuery?.replace(/\D/g, '')

  throw findUsers(
    {
      AND: [
        {
          bloodGroup: queryBloodGroup
            ? (queryBloodGroup as BloodGroup)
            : undefined,
        },
        {
          OR: [
            idQuery && { id: +idQuery },
            searchQuery && {
              name: { contains: searchQuery, mode: 'insensitive' },
            },
          ].filter(Boolean) as any,
        },
      ],
    },
    {
      select: UserAdminDBSelect,
      take: queryLimit ? +queryLimit : undefined,
      cursor: queryCursor ? { id: +queryCursor } : undefined,
      skip: queryCursor ? 1 : undefined,
    }
  )
})
