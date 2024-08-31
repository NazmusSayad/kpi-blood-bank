import Wrapper from '@/layouts/Wrapper'
import aboutUrl from '@/assets/about.jpg?url'

export default function About() {
  return (
    <div className={'py-20'}>
      <Wrapper>
        <h1 className={'text-8xl font-medium'}>আমরা কারা?</h1>

        <div className={'relative'}>
          <img src={aboutUrl} alt="" />
        </div>
      </Wrapper>
    </div>
  )
}
