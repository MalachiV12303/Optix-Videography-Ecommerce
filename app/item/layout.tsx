import PageBackground from "../ui/BackgroundDrei"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <main className='w-full max-h-dvh h-dvh mx-auto'>
        {children}
        <div className="fixed -z-30 right-0 bottom-0 w-full h-full">
          <PageBackground />
        </div>
      </main>
    </>
  )
} 