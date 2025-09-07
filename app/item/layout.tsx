export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="itemContainer min-h-screen flex flex-col">
        {children}
      </main>
    </>
  )
} 