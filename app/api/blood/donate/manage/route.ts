import { authRouteMod } from '@/router/api'
import { BloodGroup } from '@prisma/client'
import { UserAdminDBSelect } from '@/config'
import { getDonations } from '@/service/blood/donate'

export const GET = authRouteMod((req) => {
  const queryLimit = req.nextUrl.searchParams.get('limit')
  const queryCursor = req.nextUrl.searchParams.get('cursor')
  const searchQuery = req.nextUrl.searchParams.get('search')
  const idQuery = searchQuery?.replace(/\D/g, '')
  const queryBloodGroup = req.nextUrl.searchParams.get('bloodGroup')

  throw getDonations(
    {
      AND: [
        queryBloodGroup && { bloodGroup: queryBloodGroup as BloodGroup },
        idQuery && { id: +idQuery },
      ].filter(Boolean) as any[],
    },
    {
      select: UserAdminDBSelect,
      take: queryLimit ? +queryLimit : undefined,
      cursor: queryCursor ? +queryCursor : undefined,
    }
  )
})
