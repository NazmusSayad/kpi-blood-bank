import LinkButton from '@/components/ui/LinkButton'

export default function AdminSidebar() {
  return (
    <div className={'p-2 bg-red-300/30 flex flex-col justify-between'}>
      <ul className={'flex size-full justify-center md:flex-col'}>
        <li>
          <LinkButton
            fullWidth
            variant={'text'}
            color={'inherit'}
            to={'/admin/donation'}
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
            to={'/admin/request'}
            className={'!px-3 !justify-start'}
          >
            Request
          </LinkButton>
        </li>

        <li className={'md:mt-auto'}>
          <LinkButton
            fullWidth
            to={'/admin'}
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