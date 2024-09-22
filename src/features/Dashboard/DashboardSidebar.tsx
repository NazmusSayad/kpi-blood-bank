import LinkButton from '@/components/ui/LinkButton'

export default function DashboardSidebar() {
  return (
    <div className={'p-2 bg-red-300/30 flex flex-col justify-between'}>
      <ul className={'flex size-full justify-center md:flex-col'}>
        <li>
          <LinkButton
            fullWidth
            variant={'text'}
            color={'inherit'}
            href={'/admin/dashboard/donation'}
            className={'!px-3 !justify-start'}
          >
            Donation
          </LinkButton>
        </li>
        <li>
          <LinkButton
            fullWidth
            variant={'text'}
            color={'inherit'}
            href={'/admin/dashboard/request'}
            className={'!px-3 !justify-start'}
          >
            Request
          </LinkButton>
        </li>
        <li>
          <LinkButton
            fullWidth
            variant={'text'}
            color={'inherit'}
            href={'/admin/dashboard/users'}
            className={'!px-3 !justify-start'}
          >
            Users
          </LinkButton>
        </li>

        <li className={'md:mt-auto'}>
          <LinkButton
            fullWidth
            href={'/admin/dashboard'}
            variant={'text'}
            color={'inherit'}
            className={'!px-3 !justify-start'}
          >
            Dashboard
          </LinkButton>
        </li>
      </ul>
    </div>
  )
}
