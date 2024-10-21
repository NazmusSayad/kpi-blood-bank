import { ReqError } from 'req-error'
import { authRoute } from '@/router/api'
import { changeAvatar } from '@/service/account/photos'
import { generatePrivateUser } from '@/service/helpers'

export const POST = authRoute(async (req) => {
  const file = req.getFormFile('file')
  if (!file) throw new ReqError('File is required', 400)
  const user = await changeAvatar(req.user, file)
  throw generatePrivateUser(user)
})
