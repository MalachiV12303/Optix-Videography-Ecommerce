import LandingDrei from '@ui/LandingDrei';
import Footer from '@ui/Footer';
import { Store } from '@ui/Store';

export default function App({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <LandingDrei />
      <main className="container">
        <Store searchParams={searchParams} />
      </main>
      <Footer />
    </>
  )
};