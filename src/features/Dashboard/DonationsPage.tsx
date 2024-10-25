'use client'

import Header from './Header'
import Content from './Content'
import { useApi } from '@/api/http'
import DonationCard from './DonationCard'
import { BloodGroup } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useAbortSignal } from 'react-net-kit'
import { PollutedBloodDonation } from '@/config'
import BloodGroupSelect from '@/components/ui/BloodGroupSelect'

export default function DonationsPage() {
  const api = useApi()
  const [signal] = useAbortSignal()
  const [donations, setDonations] = useState<PollutedBloodDonation[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('')
  const [selectedDonation, setSelectedDonation] = useState<PollutedBloodDonation | null>(null)

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
    </div>
  )
}
