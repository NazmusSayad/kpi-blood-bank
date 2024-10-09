import { createSecretKey } from 'crypto'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET_KEY = createSecretKey(JWT_SECRET, 'utf-8')

export default {
  create(
    payload: unknown,
    options: { expiresIn?: string; secret?: string } = {}
  ) {
    const secret = options.secret
      ? createSecretKey(JWT_SECRET + '@' + options.secret, 'utf-8')
      : JWT_SECRET_KEY

    return new SignJWT({ payload })
      .setIssuedAt()
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(options.expiresIn ?? '30d')
      .sign(secret)
  },

  async parse(jwt: string, options: { secret?: string } = {}) {
    const secret = options.secret
      ? createSecretKey(JWT_SECRET + '@' + options.secret, 'utf-8')
      : JWT_SECRET_KEY

    const parsed = await jwtVerify(jwt, secret)
    return parsed.payload.payload as unknown
  },
}
