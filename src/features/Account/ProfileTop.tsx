import { http } from '@/api/http'
import { Button } from '@mui/material'
import Wrapper from '@/layouts/Wrapper'
import config, { PublicUser } from '@/config'
import useUserStore from '@/zustand/useUserStore'
import UserAvatar from '@/components/ui/UserAvatar'
import { TbUserEdit, TbLogout } from 'react-icons/tb'
import { convertBloodGroupToNormal } from '@/service/db/utils'

export default function ProfileTop({ user, enableEditMode }: ProfileTopProps) {
  const currentUser = useUserStore((state) => state)

  return (
    <>
      <div className={'w-full aspect-[4/1] max-w-[95rem] mx-auto'}>
        <img src={config.defaultAvatar} className={'size-full object-cover rounded-b-xl'} />
      </div>

      <Wrapper>
        <div
          className={
            'grid gap-4 sm:gap-6 md:gap-8 justify-center md:justify-start md:grid-cols-[auto,1fr,auto]'
          }
        >
          <div className={'-mt-12 md:-mt-10'}>
            <UserAvatar avatarUrl={user.avatar_url} className={'size-[min(100vw,12rem)] mx-auto'} />
          </div>

          <div className={'md:mt-6 text-center md:text-left'}>
            <h2 className={'text-4xl font-bold'}>{user.name}</h2>
            <div className={'mt-2 bg-red-200 rounded-full py-1 px-2 w-min mx-auto md:mx-0'}>
              {convertBloodGroupToNormal(user.bloodGroup)}
            </div>
          </div>

          {currentUser.user?.id === user.id && (
            <div className={'self-center flex justify-center gap-2 flex-col'}>
              <Button variant={'outlined'} startIcon={<TbUserEdit />} onClick={enableEditMode}>
                Edit Profile
              </Button>

              <Button
                variant={'outlined'}
                color={'error'}
                startIcon={<TbLogout />}
                onClick={async () => {
                  await http.delete('/auth')
                  currentUser.clear()
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  )
}

type ProfileTopProps = {
  user: PublicUser
  enableEditMode: () => void
}
