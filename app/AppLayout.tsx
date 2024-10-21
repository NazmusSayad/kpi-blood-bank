'use client'

import { cn } from '@/utils'
import Nav from '@/features/Nav'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }) {
  const pathName = usePathname()
  const isHomePage = pathName === '/'
  const isAdminPage = isHomePage ? false : pathName.startsWith('/admin')

  return (
    <main
      className={cn('relative', isAdminPage && 'grid grid-rows-[auto_1fr]')}
    >
      <Nav transparent={isHomePage} fixed={isHomePage} />
      {children}
    </main>
  )
}
