'use client'

import Header from './Header'
import Content from './Content'
import { useApi } from '@/api/http'
import DonationCard from './DonationCard'
import Dialog from '@mui/material/Dialog'
import { IoClose } from 'react-icons/io5'
import DonationModal from './DonationModal'
import { IconButton } from '@mui/material'
import { BloodGroup } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import { PollutedBloodDonation } from '@/config'
import DialogTitle from '@mui/material/DialogTitle'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'
import useMediaQuery from '@mui/material/useMediaQuery'
import muiTheme from '@/styles/mui-theme'

export default function DonationsPage() {
  const api = useApi()
  const [signal] = useAbortSignal()
  const [donations, setDonations] = useState<PollutedBloodDonation[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('')
  const [selectedDonation, setSelectedDonation] = useState<PollutedBloodDonation | null>(null)
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'))

  async function fetchDonations(
    searchQuery: string,
    bloodQuery: BloodGroup | '',
    cursor: number | string = ''
  ) {
    const { ok, data } = await api.get<{
      donations: PollutedBloodDonation[]
      total: number
    }>(
      `/blood/donate/manage?limit=24&search=${searchQuery}&bloodGroup=${bloodQuery}&cursor=${cursor}`,
      { signal: signal() }
    )

    if (!ok) return
    return data.donations
  }

  useEffect(() => {
    async function init() {
      const donations = await fetchDonations(searchValue, bloodGroup)
      donations && setDonations(donations)
    }

    const timeout = setTimeout(init, 300)
    return () => clearTimeout(timeout)
  }, [searchValue, bloodGroup])

  return (
    <div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}>
        <BloodGroupSelect fullWidth required={false} value={bloodGroup} setValue={setBloodGroup} />
      </Header>

      <Content
        loadMore={async () => {
          const newUsers = await fetchDonations(
            searchValue,
            bloodGroup,
            donations[donations.length - 1].id
          )

          newUsers && setDonations((prev) => [...prev, ...newUsers])
        }}
        isLoading={api.loading}
        items={donations.map((donation) => (
          <DonationCard key={donation.id} donation={donation} select={setSelectedDonation} />
        ))}
      />

      <Dialog
        open={Boolean(selectedDonation)}
        onClose={() => setSelectedDonation(null)}
        fullWidth
        fullScreen={fullScreen}
      >
        <div className={'bg-red-50 grid h-full grid-rows-[auto,1fr]'}>
          <div className={'flex items-center justify-between ml-5 my-2 mr-2 gap-4'}>
            <h2 className={'font-bold text-xl'}>
              Donation Details{' '}
              {selectedDonation && (
                <span className={'font-medium text-lg opacity-50'}>@{selectedDonation.id}</span>
              )}
            </h2>
            <IconButton onClick={() => setSelectedDonation(null)}>
              <IoClose />
            </IconButton>
          </div>

          <div className={'px-5 mb-5'}>
            <DonationModal donation={selectedDonation ?? undefined} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
