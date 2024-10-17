import Nav from '../Nav'
import Image from 'next/image'
import bgImage from '@/assets/6262.svg'
import Wrapper from '@/layouts/Wrapper'

export default function Layout({ children }) {
  return (
    <main className={'min-h-[100%] grid grid-rows-[auto,1fr]'}>
      <div>
        <Nav />
      </div>

      <div className={'size-full grid grid-flow-col grid-cols-[1fr,1fr]'}>
        <div className={'relative'}>
          <div className={'absolute inset-0'}>
            <Image
              src={bgImage}
              alt={'BG Image'}
              width={bgImage.width}
              height={bgImage.height}
              className={'object-contain size-full'}
            />
          </div>
        </div>

        <Wrapper className={'max-w-[35rem] h-full'}>{children}</Wrapper>
      </div>
    </main>
  )
}
