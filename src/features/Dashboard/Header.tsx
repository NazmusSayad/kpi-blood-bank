'use client'

import {
  Menu,
  Button,
  TextField,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { cn } from '@/utils'
import { LuFilter } from 'react-icons/lu'
import { ReactNode, useRef, useState } from 'react'

export default function Header({ children, ...props }: HeaderProps) {
  const anchorRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 48em)')

  return (
    <div className={'my-2'}>
      <div className={'flex items-center gap-2'}>
        <TextField
          fullWidth
          size={'small'}
          placeholder={'Search...'}
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
        />

        <div className={cn('text-gray-500', isDesktop && 'mx-3')}>
          {isDesktop ? (
            <Button
              variant={'outlined'}
              size={'small'}
              color={'inherit'}
              className={'scale-[1.285]'}
              ref={anchorRef as any}
              onClick={() => setMenuOpen(!isMenuOpen)}
              startIcon={<LuFilter />}
            >
              <span>Filter</span>
            </Button>
          ) : (
            <IconButton
              color={'inherit'}
              ref={anchorRef as any}
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <LuFilter />
            </IconButton>
          )}

          <Menu
            open={isMenuOpen}
            anchorEl={anchorRef.current}
            onClose={() => setMenuOpen(false)}
          >
            <div className={'min-w-48 px-2'}>{children}</div>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export type HeaderProps = {
  children?: ReactNode
  searchValue: string
  setSearchValue: (value: string) => void
}
