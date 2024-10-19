'use client'

import Nav from '@/features/Nav'
import { useApiOnce } from '@/api/http'

export default function Page() {
  const res = useApiOnce({ url: '/api' })
  const data = res.responses?.[0]?.data || ({} as any)

  return (
    <main>
      <Nav />
      <h1>About</h1>

      <p>{data.message}</p>
      <p>{data.time}</p>

      <h2>Donors</h2>

      <ul>
        {data.donors?.map((donor: any) => (
          <li key={donor.id}>{donor.name}</li>
        ))}
      </ul>
    </main>
  )
}
