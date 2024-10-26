import { PrivateUser } from '@/config'
import { RxCross2 } from 'react-icons/rx'
import EditProfileForm from './EditProfileForm'
import { DialogContent, DialogTitle, IconButton } from '@mui/material'

export default function EditProfile({ close, user }: EditProfileProps) {
  return (
    <div className={'grid grid-rows-[auto,1fr] h-full'}>
      <div className={'bg-red-50'}>
        <DialogTitle className={''}>
          <div className={'flex justify-between items-center'}>
            <h2>Edit Profile</h2>

            <IconButton onClick={close} className={'!-mr-2'}>
              <RxCross2 />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent className={'p-4'}>
          <EditProfileForm user={user} />
        </DialogContent>
      </div>
    </div>
  )
}

type EditProfileProps = {
  user: PrivateUser
  close: () => void
}
