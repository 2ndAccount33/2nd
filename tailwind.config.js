/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF6B35',
          light: '#FF8B5E',
          dark: '#E55A25',
        },
        dark: {
          900: '#0A0705',
          800: '#0D0A06',
          700: '#151008',
          600: '#1A140B',
          500: '#221A10',
          400: '#2A2015',
          300: '#3A2E1E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
