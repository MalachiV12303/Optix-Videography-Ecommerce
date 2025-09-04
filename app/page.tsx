import LandingDrei from './ui/LandingDrei';
import Store from './ui/Store';

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      {/* Center Line */}
      {/* <div className='fixed flex w-screen h-full justify-center'><div className='h-full w-px bg-white'></div></div> */}
      <LandingDrei />
      <main>
        <Store searchParams={searchParams} />
      </main>
    </>
  )
}