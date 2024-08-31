/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Roboto Serif', 'serif'],
      },
      colors: {
        'purple': '#65439B',
      }
    },
  },
  plugins: [],
}

