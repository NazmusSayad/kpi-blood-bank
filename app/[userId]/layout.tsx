import Nav from '@/features/Nav'

export default function Layout({ children }) {
  return (
    <main>
      <Nav />
      {children}
    </main>
  )
}
