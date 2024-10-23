import { BloodGroup } from '@prisma/client'
import { authRouteAdmin } from '@/router/api'
import { UserAdminDBSelect } from '@/config'
import { findUsers } from '@/service/account/user'

export const GET = authRouteAdmin(async (req) => {
  const searchQuery = req.nextUrl.searchParams.get('search')
  const queryId = searchQuery?.replace(/\D/g, '')
  const queryBloodGroup = req.nextUrl.searchParams.get('bloodGroup')

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
            queryId && { id: +queryId },
            searchQuery && {
              name: { contains: searchQuery, mode: 'insensitive' },
            },
          ].filter(Boolean) as any,
        },
      ],
    },
    { select: UserAdminDBSelect }
  )
})
