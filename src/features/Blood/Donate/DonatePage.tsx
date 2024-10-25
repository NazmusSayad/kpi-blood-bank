import Wrapper from '@/layouts/Wrapper'
import DonateForm from './DonateForm'
import bgImage from '@/assets/bg-image-1.svg'

export default function DonatePage() {
  return (
    <div className={'relative isolate'}>
      <div className={'fixed inset-0'}>
        <img src={bgImage.src} className={'size-full object-contain max-w-[90rem] mx-auto'} />
      </div>

      <div className={'relative min-h-screen pt-14 bg-stone-200/95 isolate backdrop-blur-sm'}>
        <Wrapper className={'pt-2'}>
          <h1
            className={'text-[clamp(2rem,6vw,2.5rem)] text-center font-medium max-w-[30ch] mx-auto'}
          >
            রক্ত দিব জীবন বাঁচাবো, মানব সেবায় নিজেকে নিয়োজিত রাখব।
          </h1>

          <DonateForm />
        </Wrapper>
      </div>
    </div>
  )
}
