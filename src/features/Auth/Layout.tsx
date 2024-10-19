import Nav from '../Nav'
import Image from 'next/image'
import bgImage from '@/assets/6262.svg'
import Wrapper from '@/layouts/Wrapper'
import { cn } from '@/utils'

export default function Layout({ children }) {
  return (
    <main className={'relative'}>
      <Nav />

      <div
        className={
          'fixed inset-0 opacity-20 md:w-[50%] md:opacity-100 blur-md md:blur-none'
        }
      >
        <Image
          src={bgImage}
          alt={'BG Image'}
          width={bgImage.width}
          height={bgImage.height}
          className={'object-contain size-full'}
        />
      </div>

      <div
        className={cn(
          'grid items-center min-h-[calc(100%-10rem)]',
          'md:grid-cols-[1fr,1fr]'
        )}
      >
        <div className={'hidden md:block'} />
        <Wrapper className={'max-w-[33rem]'}>{children}</Wrapper>
      </div>
    </main>
  )
}
