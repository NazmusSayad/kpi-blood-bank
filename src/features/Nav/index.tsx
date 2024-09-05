import { useLayoutEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import Wrapper from '@/layouts/Wrapper'
import logoSrc from '@/assets/logo.jpg?url'
import NavModal from './NavModal'
import { Link, useLocation } from 'react-router-dom'
import LinkButton from '@/components/ui/LinkButton'

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const location = useLocation()

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  console.log(location)

  return (
    <div
      className={cn(
        'fixed top-0 w-full -z-[-999] border-b border-transparent transition-all duration-300 text-white bg-transparent',
        (scrollPosition > 0 || location.pathname !== '/') &&
          'bg-red-500/80 border-b-gray-500/20 backdrop-blur-lg shadow-sm'
      )}
    >
      <Wrapper>
        <div className={'flex justify-between items-center'}>
          <IconButton component={Link} to="/">
            <img
              src={logoSrc}
              alt={'Logo'}
              className={'w-10 h-10 rounded-[50%]'}
            />
          </IconButton>

          <div className={'hidden sm:flex items-center gap-3'}>
            {links.map((link) => (
              <LinkButton variant={'text'} color={'inherit'} to={link.to}>
                {link.label}
              </LinkButton>
            ))}
          </div>

          <div className={'hidden sm:block'}>
            <LinkButton
              to={'/admin'}
              color={'inherit'}
              variant={scrollPosition > 0 ? 'contained' : 'outlined'}
            >
              Admin
            </LinkButton>
          </div>

          <div className={'block sm:hidden'}>
            <NavModal />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
