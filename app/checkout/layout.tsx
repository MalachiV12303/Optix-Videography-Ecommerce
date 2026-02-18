export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className='pt-[80px] h-dvh w-full mx-auto'>
      {children}
    </main>
  )
} ;