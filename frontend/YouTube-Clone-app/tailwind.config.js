/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-smaller': { max: '321px' }, // Custom breakpoint for < 320px
        'custom-small': '374px', //custom screen size for applying padding
        'custom-medium': '500px', //custom screen size for comments section
        'custom-mid': '700px', //custom screen size for changing styles of tablet
        'custom-lgDesktop' : '1200px'
      },
    },
  },
  plugins: [],
}

