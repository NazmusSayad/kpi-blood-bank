import { notFound } from 'next/navigation'
import { findUsers } from '@/service/account/user'
import Profile from '@/features/Account/Profile'

export default async function Page({ params }) {
  const userId = decodeURIComponent(params.userId)
  if (!userId.startsWith('@')) return notFound()
  const actualUserId = userId.slice(1)
  if (!actualUserId || actualUserId.match(/\D/)) return notFound()
  const users = await findUsers({ id: +actualUserId })
  const user = users.users[0]

  if (!user)
    return (
      <div>
        <h1>User not found</h1>
        <p>UserId: {userId}</p>
      </div>
    )

  return <Profile user={user} />
}
