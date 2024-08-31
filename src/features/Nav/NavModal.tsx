import { useState } from 'react'
import { Button, IconButton, Modal } from '@mui/material'
import { RxHamburgerMenu } from 'react-icons/rx'
import navLinks from './nav-links'
import { Link } from 'react-router-dom'

export default function NavModal() {
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
          className={tw(
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
            {navLinks.map((link) => (
              <Button
                variant={'text'}
                color={'inherit'}
                LinkComponent={Link}
                href={link.to}
              >
                {link.label}
              </Button>
            ))}
          </div>

          <hr className={'mt-2 mb-4 opacity-10'} />

          <div className={'flex flex-col gap-2'}>
            <Button variant={'outlined'} color={'primary'}>
              Login
            </Button>
            <Button variant={'outlined'} color={'primary'}>
              Login
            </Button>
            <Button variant={'contained'} color={'primary'}>
              Login
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
