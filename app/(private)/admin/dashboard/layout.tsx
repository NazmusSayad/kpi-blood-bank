import DashboardSidebar from '@/features/Dashboard/DashboardSidebar'



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={'flex size-full flex-col-reverse md:flex-row'}>
      <DashboardSidebar />

      <div className={'overflow-auto size-full max-w-full flex-1'}>
        {children}
      </div>
    </div>
  )
}
