/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      backgroundSize: {
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '100%': '100%',
      },
      colors: {
        customBlue:'#f1f5f9',
      },
      width: {
        '20': '200px',
        '30': '300px',
        '40': '400px',
        '45': '400px',
        '50': '500px',
        '60': '600px',
        '70': '700px',
        '3/5': '60%',
      },
      height: {
        '15': '15rem',
        '20': '20rem',
        '25': '25rem',
        '30': '30rem',
        '40': '40rem',
        '50': '50rem',
        '60': '60rem',
        '70': '70rem',
        '3/5': '60%',
      },
    },
  },
  plugins: [],
}

