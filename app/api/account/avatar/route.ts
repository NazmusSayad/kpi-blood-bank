import { authRoute } from '@/router/api'
import { selectInObj } from '@/service/db/helpers'
import { changeAvatar } from '@/service/account/photos'
import { UserPrivateFields } from '@/service/db/config'

export const POST = authRoute(async (req) => {
  const file = req.form_data?.get('file')
  const user = await changeAvatar(req.user, file as File)
  throw selectInObj(user, UserPrivateFields)
})
