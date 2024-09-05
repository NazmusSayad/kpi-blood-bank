import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

export default function AdminPage() {
  return (
    <div className={'pt-14 grid h-full grid-cols-[auto_1fr]'}>
      <AdminSidebar />
      <Outlet />
    </div>
  )
}
