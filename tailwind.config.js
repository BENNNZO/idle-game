/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main': 'rgb(46, 255, 176)',
        'main-light': 'rgb(46, 255, 176)',
        'main-medium': 'rgb(26, 185, 117)',
        'main-dark': 'rgb(17, 68, 46)'
      },
    },
  },
  plugins: [],
}
