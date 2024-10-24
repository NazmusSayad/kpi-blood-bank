import r, { env } from 'rype'

export default env({
  DATABASE_URL: r.string(),
  IMAGE_KIT_KEY: r.string(),
  JWT_SECRET: r.string(),

  UNSAFE___DEV___USE_FIXED_OTP: r.string().optional(),
})
