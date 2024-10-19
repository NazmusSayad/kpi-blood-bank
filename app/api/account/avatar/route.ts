import { authRoute } from '@/router/api'
import { throwPrivateUser } from '@/service/helpers'
import { changeAvatar } from '@/service/account/photos'

export const POST = authRoute(async (req) => {
  const file = req.getFormFile('file')
  const user = await changeAvatar(req.user, file)
  await throwPrivateUser(user)
})
