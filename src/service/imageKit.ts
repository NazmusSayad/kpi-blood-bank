import sharp from 'sharp'
import axios from 'axios'
import FormData from 'form-data'
import config from '@/config'

const PRIVATE_KEY = process.env.IMAGE_KIT_KEY
const PRIVATE_KEY_BASE64 = Buffer.from(PRIVATE_KEY + ':').toString('base64')

async function upload(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder?: string
) {
  const form = new FormData()

  if (folder) form.append('folder', folder)
  form.append('fileName', fileName)
  form.append('file', fileBuffer, {
    filename: fileName,
    contentType,
  })

  const { data } = await axios.post(
    'https://upload.imagekit.io/api/v1/files/upload',
    form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: 'Basic ' + PRIVATE_KEY_BASE64,
      },
    }
  )

  return data as {
    fileId: string
    name: string
    size: number
    versionInfo: { id: string; name: string }
    filePath: string
    url: string
    fileType: 'image'
    height: number
    width: number
    thumbnailUrl: string
  }
}

export async function uploadAvatar(file: File) {
  const fileBuffer = await file.arrayBuffer()
  const optimizedFileBuffer = await sharp(fileBuffer)
    .resize(256, 256, { fit: 'cover' })
    .toFormat('webp', { quality: 80 })
    .toBuffer()

  return upload(optimizedFileBuffer, 'avatar.webp', 'image/webp', '/avatars')
}

export async function deleteFile(fileId: string) {
  const { data } = await axios.delete(
    `https://api.imagekit.io/v1/files/${fileId}`,
    { headers: { [config.headerAuthTokenKey]: 'Basic ' + PRIVATE_KEY_BASE64 } }
  )

  return data
}
