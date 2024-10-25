import Wrapper from '@/layouts/Wrapper'
import RequestForm from './RequestForm'
import bgImage from '@/assets/bg-image-2.svg'

export default function RequestPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={'relative min-h-screen pt-14 bg-stone-200/95 isolate backdrop-blur-sm'}>
        <Wrapper className={'pt-2'}>
          <h1 className={'text-[clamp(2rem,6vw,2.5rem)] text-center font-medium font-rubik'}>
            Request for Blood
          </h1>

          <RequestForm />
        </Wrapper>
      </div>
    </div>
  )
}
