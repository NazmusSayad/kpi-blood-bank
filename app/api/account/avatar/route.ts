import { authRoute } from '@/router/api'
import { throwPrivateUser } from '@/service/helpers'
import { changeAvatar } from '@/service/account/photos'

export const POST = authRoute(async (req) => {
  const file = req.form_data?.get('file')
  const user = await changeAvatar(req.user, file as File)
  await throwPrivateUser(user)
})
