/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundColor: {
          transparent: 'transparent',
        },
        colors: {
          bgColor: "#F7EAE4",
          text: "#2D2929"
        }
      },
    },
    plugins: [],
  }