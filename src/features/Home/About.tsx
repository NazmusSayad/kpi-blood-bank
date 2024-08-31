import Wrapper from '@/layouts/Wrapper'
import aboutUrl from '@/assets/about.jpg?url'

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
            <img src={aboutUrl} className={'size-full object-cover'} />
          </div>

          <div
            className={tw(
              'text-white bg-red-500/75 backdrop-blur-md',
              'px-[5%] py-[3%] grid gap-2 sm:text-lg md:text-xl lg:text-2xl'
            )}
          >
            <p className={'drop-shadow-md'}>
              আমরা একটি সম্পূর্ণ বাংলাদেশি প্রযুক্তি সংবাদপত্র। আমরা প্রযুক্তি
              সম্পর্কে সবকিছু নিয়ে লেখা লিখি।
            </p>
            <p className={'drop-shadow-md'}>
              আমরা একটি সম্পূর্ণ বাংলাদেশি প্রযুক্তি সংবাদপত্র। আমরা প্রযুক্তি
              সম্পর্কে সবকিছু নিয়ে লেখা লিখি।
            </p>
            <p className={'drop-shadow-md'}>
              আমরা একটি সম্পূর্ণ বাংলাদেশি প্রযুক্তি সংবাদপত্র। আমরা প্রযুক্তি
              সম্পর্কে সবকিছু নিয়ে লেখা লিখি।
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
