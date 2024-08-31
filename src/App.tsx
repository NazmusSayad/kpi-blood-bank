import { Route, Routes } from 'react-router-dom'
import Home from './features/Home'
import Nav from './features/Nav'

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
