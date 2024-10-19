import { authRoute } from '@/router/api'
import { generatePrivateUser } from '@/service/helpers'
import { changeAvatar } from '@/service/account/photos'
import { ReqError } from 'req-error'

export const POST = authRoute(async (req) => {
  const file = req.getFormFile('file')
  if (!file) throw new ReqError('File is required', 400)
  const user = await changeAvatar(req.user, file)
  throw generatePrivateUser(user)
})
