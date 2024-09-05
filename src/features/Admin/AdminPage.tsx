import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

export default function AdminPage() {
  return (
    <div className={'pt-14 flex size-full flex-col-reverse md:flex-row'}>
      <AdminSidebar />
      <div className={'overflow-auto size-full max-w-full flex-1'}>
        <Outlet />
      </div>
    </div>
  )
}
