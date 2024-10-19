import db from '../db'
import { ReqError } from 'req-error'
import { User } from '@prisma/client'
import { deleteFile, uploadAvatar } from '../imageKit'

const MAX_AVATAR_SIZE = 3 * 1024 * 1024
export async function changeAvatar(user: User, file: File) {
  if (file.size > MAX_AVATAR_SIZE) {
    throw new ReqError('File must be less than 3MiB', 400)
  }

  const result = await uploadAvatar(file)
  const newUser = await db.user.update({
    where: { id: user.id },
    data: {
      avatar_fileId: result.fileId,
      avatar_url: result.url,
    },
  })

  if (user.avatar_fileId) {
    await deleteFile(user.avatar_fileId)
  }

  return newUser
}
