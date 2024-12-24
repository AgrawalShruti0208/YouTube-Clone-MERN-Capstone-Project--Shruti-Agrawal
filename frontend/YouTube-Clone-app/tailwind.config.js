/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-small': '374px', //custom screen size for applying padding
        'custom-medium': '500px', //custom screen size for comments section
        'custom-mid': '700px', //custom screen size for changing styles of tablet
      },
    },
  },
  plugins: [],
}

