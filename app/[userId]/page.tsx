import PublicProfile from '@/features/Profile/PublicProfile'
import { findUsers } from '@/service/account/user'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const userId = decodeURIComponent(params.userId)
  if (!userId.startsWith('@')) return notFound()
  const actualUserId = userId.slice(1)
  if (!actualUserId || actualUserId.match(/\D/)) return notFound()
  const [user] = await findUsers({ id: +actualUserId })
  if (!user)
    return (
      <div>
        <h1>User not found</h1>
        <p>UserId: {userId}</p>
      </div>
    )

  return <PublicProfile user={user} />
}
