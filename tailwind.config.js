/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#aa957b',
        'card-bg': '#ffeacd',
        'text-primary': '#684a2e',
        'text-secondary': '#583c22'
      },
      fontFamily: {
        'alexandria': ['Alexandria', 'Noto Sans JP', 'Noto Sans SC', 'sans-serif']
      }
    },
  },
  plugins: [],
}
