/** @type {import('next').NextConfig} */
export default {
  sassOptions: {
    additionalData: `@use '@/styles/core' as *;\n`,
    silenceDeprecations: ['legacy-js-api'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : undefined,
  },
}
