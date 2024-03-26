/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'cuustom-light-white': '#EFDFCC',
        'custom-brown': '#BA8E7A',
        'custom-green': '#66796B',
      }
    }
  },
  plugins: [],
}