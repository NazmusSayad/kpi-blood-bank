import Wrapper from '@/layouts/Wrapper'
import css from './Hero.module.scss'
import BGSvg from '@/assets/6262.svg?url'
import { Button } from '@mui/material'

export default function Hero(props: Props) {
  return (
    <div className={'min-h-screen relative isolate bg-red-900/60'}>
      <div
        style={{ backgroundImage: `url(${BGSvg})` }}
        className={tw(
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
                  className={tw(
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
                <Button variant={'contained'} color={'error'}>
                  Donate
                </Button>

                <Button variant={'outlined'} color={'error'}>
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

type Props = {}
