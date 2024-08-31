/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/**/*.{ts,tsx}', './index.html'],
    transform: require('tailwind-variant-group').transform,
  },
  theme: {
    screens: {
      xxs: '25em',
      xs: '31.25em',
      sm: '37.5em',
      md: '48em',
      lg: '62em',
      xl: '75em',
      xxl: '90em',
      xxxl: '112.5em',
    },
  },
  plugins: [],
}
