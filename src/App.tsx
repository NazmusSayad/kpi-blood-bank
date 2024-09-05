import { Route, Routes } from 'react-router-dom'
import Nav from './features/Nav'
import Home from './features/Home'
import AdminPage from './features/Admin/AdminPage'
import DonatePage from './features/Donate/DonatePage'
import RequestPage from './features/Request/RequestPage'
import RootBackground from './components/RootBackground'
import RequestTable from './features/Admin/RequestTable'
import DonationTable from './features/Admin/DonationTable'
import AdminIndex from './features/Admin/AdminIndex'

const App = () => {
  return (
    <>
      <Nav />
      <RootBackground />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/request" element={<RequestPage />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="" element={<AdminIndex />} />
          <Route path="request" element={<RequestTable />} />
          <Route path="donation" element={<DonationTable />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
