import Wrapper from '@/layouts/Wrapper'
import DashboardSidebar from '@/features/Dashboard/DashboardSidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className={'flex overflow-hidden flex-col-reverse md:flex-row'}>
      <DashboardSidebar />
      <div className={'overflow-auto flex-1'}>
        <Wrapper>{children}</Wrapper>
      </div>
    </div>
  )
}
