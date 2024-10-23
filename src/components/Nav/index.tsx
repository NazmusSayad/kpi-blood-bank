'use client'

import Link from 'next/link'
import { cn } from '@/utils'
import Image from 'next/image'
import NavModal from './NavModal'
import navLinks from './nav-links'
import Wrapper from '@/layouts/Wrapper'
import logoImage from '@/assets/logo.jpg'
import { IconButton } from '@mui/material'
import { userHasAccess } from '@/service/utils'
import { useLayoutEffect, useState } from 'react'
import useUserStore from '@/zustand/useUserStore'
import { RiShieldFlashLine } from 'react-icons/ri'
import LinkButton from '@/components/ui/LinkButton'
import UserAvatar from '@/components/ui/UserAvatar'

export default function Nav(props: NavProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const user = useUserStore((state) => state.user)
  const isLoggedIn = !!user

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        props.position ?? 'sticky',
        'top-0 w-full -z-[-999] border-b border-transparent transition-all duration-300 text-white bg-transparent',
        !(scrollPosition === 0 && props.transparent) &&
          'bg-red-500/95 border-b-gray-500/20 backdrop-blur-lg shadow-sm'
      )}
    >
      <Wrapper>
        <div className={'flex justify-between items-center'}>
          <IconButton component={Link} href="/">
            <Image
              alt={'Logo'}
              src={logoImage.src}
              className={'size-8 rounded-[50%]'}
              width={logoImage.width}
              height={logoImage.height}
            />
          </IconButton>

          <div className={'hidden sm:flex items-center gap-3'}>
            {navLinks.map((link, i) => (
              <LinkButton
                key={i}
                variant={'text'}
                color={'inherit'}
                href={link.to}
              >
                {link.label}
              </LinkButton>
            ))}
          </div>

          {isLoggedIn ? (
            <div className={'hidden sm:flex'}>
              {userHasAccess(user).moderator && (
                <LinkButton
                  iconButton
                  color={'inherit'}
                  href={'/admin'}
                  variant={'outlined'}
                >
                  <RiShieldFlashLine className={'size-6'} />
                </LinkButton>
              )}
              <LinkButton
                iconButton
                href={'/@' + user?.id}
                color={'inherit'}
                variant={'outlined'}
              >
                <UserAvatar avatarUrl={user?.avatar_url} />
              </LinkButton>
            </div>
          ) : (
            <div className={'hidden sm:flex gap-2'}>
              <LinkButton
                href={'/auth/login'}
                color={'inherit'}
                variant={'text'}
              >
                Login
              </LinkButton>
              <LinkButton
                href={'/auth/register'}
                variant={'outlined'}
                color={'inherit'}
              >
                Register
              </LinkButton>
            </div>
          )}

          <div className={'block sm:hidden'}>
            <NavModal isLoggedIn={isLoggedIn} user={user} />
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}

type NavProps = {
  transparent?: boolean
  position?:
    | 'fixed'
    | 'sticky'
    | 'absolute'
    | 'relative'
    | 'static'
    | 'initial'
    | 'inherit'
}
