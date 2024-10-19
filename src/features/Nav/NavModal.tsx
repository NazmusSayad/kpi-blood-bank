import { useState } from 'react'
import { IconButton, Modal } from '@mui/material'
import { RxHamburgerMenu } from 'react-icons/rx'
import navLinks from './nav-links'
import LinkButton from '@/components/ui/LinkButton'
import { cn } from '@/utils'

export default function NavModal({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOnClose(e: MouseEvent, reason: string) {
    if (reason === 'backdropClick') {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <IconButton color={'inherit'} onClick={() => setIsOpen(true)}>
        <RxHamburgerMenu />
      </IconButton>

      <Modal open={isOpen} onClose={handleOnClose}>
        <div
          className={cn(
            'w-[min(15rem,100%)] h-full ml-auto text-white px-4',
            'bg-slate-800/60 backdrop-blur-lg drop-shadow-lg'
          )}
        >
          <div className={'flex justify-between items-center mb-2'}>
            <div>Menu</div>

            <IconButton color={'inherit'} onClick={() => setIsOpen(false)}>
              <RxHamburgerMenu />
            </IconButton>
          </div>

          <div className={'flex flex-col text-center gap-2'}>
            {navLinks.map((link, i) => (
              <LinkButton
                key={i}
                href={link.to}
                variant={'text'}
                color={'inherit'}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </LinkButton>
            ))}
          </div>

          <hr className={'mt-2 mb-4 opacity-10'} />

          <div className={'flex flex-col gap-2'}>
            {isLoggedIn ? (
              <>
                <LinkButton
                  variant={'contained'}
                  color={'primary'}
                  href={'/account'}
                >
                  Account
                </LinkButton>
              </>
            ) : (
              <>
                <LinkButton
                  variant={'outlined'}
                  color={'primary'}
                  href={'/auth/login'}
                >
                  Login
                </LinkButton>

                <LinkButton variant={'contained'} href={'/auth/register'}>
                  Register
                </LinkButton>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
