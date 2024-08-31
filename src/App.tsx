import { Route, Routes } from 'react-router-dom'
import Home from './features/Home'
import Nav from './features/Nav'
import RootBackground from './components/RootBackground'

const App = () => {
  return (
    <>
      <Nav />
      <RootBackground />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
