import path from 'path'
import sharp from 'sharp'

const imagePath = path.resolve('./src/assets/DefaultAvatar.jpg')
const buffer = await sharp(imagePath).resize(64, 64).blur(2).toBuffer()
const dataUrl = `data:image/${imagePath.split('.').pop()};base64,${buffer.toString('base64')}`

console.log(dataUrl)
