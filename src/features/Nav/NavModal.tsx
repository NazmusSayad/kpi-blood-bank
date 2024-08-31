import { Backdrop, Button, Dialog, IconButton } from '@mui/material'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

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

      <Dialog open={isOpen} onClose={handleOnClose} className={''}>
        <div className={'flex-1'}>
          <Button variant={'text'}>Home</Button>
          <Button variant={'text'}>About</Button>
          <Button variant={'text'}>Contact</Button>
        </div>
      </Dialog>
    </div>
  )
}
