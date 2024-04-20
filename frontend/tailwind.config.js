/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.{js,jsx,ts,tsx}',
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Roboto','sans-serif']
      },
      gridTemplateColumns:{
        '70/30': '70% 28%'
      },
      colors: {
        'custom-light-brown': '#D4C2AD',
        'custom-light-orange': '#D7A184',
        'custom-light-white': '#EFDFCC',
        'custom-brown': '#BA8E7A',
        'custom-green': '#66796B',
        'custom-coffe-brown': '#6F4E37',
        'cool-blue': "bg-slate-800"
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
