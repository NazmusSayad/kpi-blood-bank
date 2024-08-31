import { useLayoutEffect, useState } from 'react'
import { Button } from '@mui/material'
import Wrapper from '@/layouts/Wrapper'
import logoSrc from '@/assets/logo.jpg?url'
import NavModal from './NavModal'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={tw(
        'fixed top-0 w-full -z-[-999] border-b border-transparent transition-all duration-300 text-white bg-transparent',
        scrollPosition > 0 &&
          'bg-red-500/80 border-b-gray-500/20 backdrop-blur-lg shadow-sm'
      )}
    >
      <Wrapper>
        <div className={'flex justify-between items-center'}>
          <div className={'py-2'}>
            <img
              src={logoSrc}
              alt={'Logo'}
              className={'w-10 h-10 rounded-[50%]'}
            />
          </div>

          <div className={'hidden sm:flex items-center gap-3'}>
            {links.map((link) => (
              <Button
                variant={'text'}
                color={'inherit'}
                component={Link}
                to={link.to}
              >
                {link.label}
              </Button>
            ))}
          </div>

          <div className={'hidden sm:block'}>
            <Button
              color={'inherit'}
              variant={scrollPosition > 0 ? 'contained' : 'outlined'}
            >
              Login
            </Button>
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
