const postcssPresetEnv = require('postcss-preset-env')
const isProdMode = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {},
  },
}
