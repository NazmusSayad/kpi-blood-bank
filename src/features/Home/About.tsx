import Wrapper from '@/layouts/Wrapper'
import aboutUrl from '@/assets/about.jpg'
import { cn } from '@/utils'

export default function About() {
  return (
    <div className={'py-20'}>
      <Wrapper>
        <div className={'mb-16 w-fit'}>
          <h1
            className={
              'text-5xl xxs:text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800'
            }
          >
            আমরা কারা?
          </h1>
          <hr className={'bg-cyan-500/20 h-1'} />
        </div>

        <div
          className={
            'rounded-2xl overflow-hidden border-2 border-gray-500/50 backdrop-blur-sm'
          }
        >
          <div className={'max-h-[50vh] overflow-hidden opacity-90'}>
            <img src={aboutUrl.src} className={'size-full object-cover'} />
          </div>

          <div
            className={cn(
              'text-white bg-red-500/75 backdrop-blur-md',
              'px-[5%] py-[3%] grid gap-2 sm:text-lg md:text-xl lg:text-2xl'
            )}
          >
            <p className={'drop-shadow-md'}>
              আমরা খুলনা পলিটেকনিক ইনস্টিটিউট এর শিক্ষক ও শিক্ষার্থী।
            </p>

            <div>
              <li className={'drop-shadow-md'}>
                আমরা একটি স্বেচ্ছাসেবী সংগঠন।
              </li>
              <li className={'drop-shadow-md'}>মানুষের সাথে মানুষের জন্য।</li>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
