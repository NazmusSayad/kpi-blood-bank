import { cn } from '@/utils'
import { Button, Card } from '@mui/material'
import { PollutedBloodDonation } from '@/config'
import UserAvatar from '@/components/ui/UserAvatar'
import { convertBloodGroupToNormal } from '@/service/db/utils'

export default function DonationCard({ donation, select }: DonationCardProps) {
  return (
    <Card className={'px-3 py-2 !bg-red-50'}>
      <div className={'relative isolate'}>
        <div
          className={cn(
            '-z-10 absolute p-2 rounded-full bg-red-200 top-0 right-0 grid place-content-center font-bold text-sm'
          )}
        >
          <div className={'min-w-[3ch] text-center'}>
            {convertBloodGroupToNormal(donation.bloodGroup)}
          </div>
        </div>

        <div className={'font-medium pt-1'}>@{donation.id}</div>

        <div className={'flex items-center gap-2 bg-red-500/10 rounded-full mt-3 mb-2'}>
          <UserAvatar avatarUrl={donation.user.avatar_url} className={'size-12'} />

          <div>
            <p className={'font-medium'}>{donation.user.name}</p>
            <p className={'font-rubik text-gray-500 text-sm'}>@{donation.user.id}</p>
          </div>
        </div>

        <div>
          <p className={'text-sm text-gray-500'}>
            <span className={'font-medium'}>Phone:</span>{' '}
            <a href={'tel:' + donation.user.phone}>{donation.user.phone}</a>
          </p>
        </div>

        <div className={'mt-3'}>
          <Button
            fullWidth
            size={'small'}
            color={'primary'}
            variant={'outlined'}
            onClick={() => select(donation)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export type DonationCardProps = {
  donation: PollutedBloodDonation
  select(donation: PollutedBloodDonation): void
}
