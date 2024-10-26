'use client'

import { useState } from 'react'
import ProfileTop from './ProfileTop'
import EditProfile from './EditProfile'
import muiTheme from '@/styles/mui-theme'
import { PrivateUser, PublicUser } from '@/config'
import { Dialog, useMediaQuery } from '@mui/material'

export default function Profile({ user }: { user: PublicUser }) {
  const [editMode, setEditMode] = useState(false)
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'))

  return (
    <div>
      <ProfileTop user={user} enableEditMode={() => setEditMode(true)} />

      <Dialog open={editMode} onClose={() => setEditMode(false)} fullWidth fullScreen={fullScreen}>
        <EditProfile user={user as PrivateUser} close={() => setEditMode(false)} />
      </Dialog>
    </div>
  )
}
