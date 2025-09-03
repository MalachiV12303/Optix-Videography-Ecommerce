import LogoAnimation from './ui/logoanimation'

export default function Home() {
  return (
    <>
      {/* <div className='fixed flex w-screen h-full justify-center'><div className='h-full w-[1px] bg-white'></div></div> */}
      <div className='pixelate fixed w-screen h-[100dvh]'>
        <LogoAnimation />
      </div>
      <main className={`select-none fixed h-[100dvh] justify-between py-40 sm:py-24 w-full flex flex-col items-center lowercase text-xl tracking-widest`}>
          <p>mock videography market</p>
          <p>by malachi valle</p>
      </main>
    </>
  )
}