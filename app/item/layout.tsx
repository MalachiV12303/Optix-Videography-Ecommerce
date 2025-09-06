export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="container min-h-screen flex flex-col justify-center">
        {children}
      </main>
    </>
  )
} 