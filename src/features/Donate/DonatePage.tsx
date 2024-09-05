import Wrapper from '@/layouts/Wrapper'
import DonateForm from './DonateForm'
import bgImage from '@/assets/bg-image-1.svg?url'

export default function DonatePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className={
          'relative min-h-screen pt-14 bg-stone-200/95 isolate backdrop-blur-sm'
        }
      >
        <Wrapper className={'pt-2'}>
          <h1
            className={
              'text-[clamp(2rem,6vw,2.5rem)] text-center font-medium font-rubik'
            }
          >
            Your donation can save other's life
          </h1>
          <h3 className={'text-center'}>So let's donate</h3>

          <DonateForm />
        </Wrapper>
      </div>
    </div>
  )
}
