import { http } from '@/api/http'
import { PrivateUser } from '@/config'
import useUserStore from '@/zustand/useUserStore'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function PrivateProfile({ user }: { user: PrivateUser }) {
  const router = useRouter()
  const userStore = useUserStore()
  async function handleLogout() {
    http.delete('/auth').then(() => {
      userStore.clear()
      router.replace('/')
    })
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
