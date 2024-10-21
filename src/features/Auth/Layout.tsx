import Image from 'next/image'
import bgImage from '@/assets/6262.svg'
import Wrapper from '@/layouts/Wrapper'

export default function Layout({ children }) {
  return (
    <div>
      <div
        className={
          'fixed inset-0 opacity-20 md:w-[50vw] md:opacity-100 blur-md md:blur-none bg-green-500/5'
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

      <Wrapper className={'grid min-h-[calc(100%-10rem)]'}>
        <div className={'grid items-center md:grid-cols-[1fr,1fr]'}>
          <div className={'hidden md:block'} />
          <Wrapper className={'max-w-[33rem]'}>{children}</Wrapper>
        </div>
      </Wrapper>
    </div>
  )
}
