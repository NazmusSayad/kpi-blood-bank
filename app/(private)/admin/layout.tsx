import Nav from '@/features/Nav'

export default function Layout({ children }) {
  return (
    <main className={'grid grid-rows-[auto_1fr]'}>
      <Nav />

      {children}
    </main>
  )
}
