import { cn } from '@/utils'
import { UserDetails } from './UserCard'
import { PollutedBloodDonation } from '@/config'

export default function DonationModal({ donation }: { donation?: PollutedBloodDonation }) {
  return (
    <div>
      <div
        className={cn(
          'grid gap-4',
          'grid-cols-[repeat(auto-fit,minmax(auto,1fr))]',
          'xs:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]'
        )}
      >
        <div>
          <h1>Donor:</h1>
          <UserDetails user={donation?.user} />
        </div>

        {donation?.user?.id !== donation?.createdBy?.id && (
          <div>
            <h1>Donation Requested By:</h1>
            <UserDetails user={donation?.createdBy} />
          </div>
        )}

        {donation?.statusUpdatedBy && (
          <div>
            <h1>Donation Moderator:</h1>
            <UserDetails user={donation?.statusUpdatedBy} />
          </div>
        )}
      </div>
    </div>
  )
}
