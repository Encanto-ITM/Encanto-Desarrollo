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
        'purple': '#2a1d45 ',
        'light-gray': '#75797E',
        'white-gray': '#D3D3D3',
        'red': '#BF4B3A',
        'blue': '#4281CB',
        'green': '#29702D',
        'yellow': '#BDAA2D',

      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      }
    },
  },
  plugins: [],
}

