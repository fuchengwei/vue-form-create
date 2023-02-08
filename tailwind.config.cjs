/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,val(--el-color-white))'
        }
      })
    }
  ]
}
