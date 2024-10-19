import Nav from '@/features/Nav'
import Wrapper from '@/layouts/Wrapper'

export default function Layout({ children }) {
  return (
    <main>
      <Nav />
      {children}
    </main>
  )
}
