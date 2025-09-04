export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className='w-full max-h-dvh h-dvh mx-auto'>
        {children}
      </main>
    </>
  )
} 