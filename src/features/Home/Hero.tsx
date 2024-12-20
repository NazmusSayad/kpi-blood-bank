import Wrapper from '@/layouts/Wrapper'
import css from './Hero.module.scss'
import BGSvg from '@/assets/6262.svg'
import { Button } from '@mui/material'
import { cn } from '@/utils'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className={'min-h-screen relative isolate bg-red-900/60'}>
      <div
        style={{ backgroundImage: `url(${BGSvg.src})` }}
        className={cn(
          css.background,
          'absolute inset-0 opacity-50',
          'bg-no-repeat bg-right-bottom'
        )}
      />

      <div className={'absolute inset-0'}>
        <Wrapper className={'h-full'}>
          <div className={'md:ml-[8%] h-full w-full flex items-center'}>
            <div className={'flex-1'}>
              <div className={'mb-16 text-white text-center md:text-left'}>
                <h1
                  className={cn(
                    'font-[Galada]',
                    '!leading-[1.5] font-bold drop-shadow-lg',
                    'text-6xl xxs:text-7xl sm:text-[6rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] xxl:text-[10rem]'
                  )}
                >
                  রক্ত দিন,
                  <br />
                  একটি জীবন বাঁচান
                </h1>

                <h3>রক্ত দিতে এবং পেতে সাহায্য করুন</h3>
              </div>
              <div className={'flex gap-3 md:justify-start justify-center'}>
                <Button
                  href={'/blood/donate'}
                  LinkComponent={Link}
                  variant={'contained'}
                  color={'error'}
                >
                  Donate
                </Button>

                <Button
                  href={'/blood/request'}
                  LinkComponent={Link}
                  variant={'outlined'}
                  color={'error'}
                  className={'backdrop-blur-sm !bg-red-50/50'}
                >
                  Request
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  )
}
