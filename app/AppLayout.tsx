'use client'

import { cn } from '@/utils'
import Nav from '@/components/Nav'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }) {
  const pathName = usePathname()
  const isHomePage = pathName === '/'
  const isDashboard = isHomePage
    ? false
    : pathName.startsWith('/admin/dashboard')

  return (
    <main
      className={cn('relative', isDashboard && 'grid grid-rows-[auto_1fr]')}
    >
      <Nav
        transparent={isHomePage}
        position={isHomePage ? 'fixed' : undefined}
      />
      {children}
    </main>
  )
}
