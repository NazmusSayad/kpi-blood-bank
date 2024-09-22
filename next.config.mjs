/** @type {import('next').NextConfig} */
export default {
  sassOptions: {
    additionalData: `@use '@/styles/core' as *;\n`,
  },
}
console.log('\n'.repeat(3))
console.log({ VERCEL_URL })
console.log('\n'.repeat(3))
