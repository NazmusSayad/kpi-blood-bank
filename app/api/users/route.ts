import { ReqError } from 'req-error'
import { authRoute } from '@/router/api'
import { BloodGroup } from '@prisma/client'
import { findUsers } from '@/service/account/user'

export const GET = authRoute(async (req) => {
  const queryId = req.nextUrl.searchParams.get('id')?.replace(/\D/g, '')
  const queryName = req.nextUrl.searchParams.get('name')
  const queryBloodGroup = req.nextUrl.searchParams.get('bloodGroup')

  if (!queryId && !queryName && !queryBloodGroup) {
    throw new ReqError('At least one query parameter is required')
  }

  throw findUsers({
    AND: [
      {
        bloodGroup: queryBloodGroup
          ? (queryBloodGroup as BloodGroup)
          : undefined,
      },
      {
        OR: [
          queryId && { id: +queryId },
          queryName && { name: { contains: queryName, mode: 'insensitive' } },
        ].filter(Boolean) as any,
      },
    ],
  })
})
