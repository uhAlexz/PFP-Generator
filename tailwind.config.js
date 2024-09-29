/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}"],
  theme: {
      extend: {
          fontFamily: {
              'minecraft': ['Minecraftia', 'sans-serif'],
          }
      },
  },
  plugins: [],
}
