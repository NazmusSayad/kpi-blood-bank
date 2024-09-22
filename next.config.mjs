/** @type {import('next').NextConfig} */
export default {
  sassOptions: {
    additionalData: `@use '@/styles/core' as *;\n`,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : undefined,
  },
}
