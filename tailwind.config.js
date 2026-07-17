/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        base: '#F2EDE3',
        'base-alt': '#EDE6D5',
        accent: '#C4622D',
        'text-main': '#1C1510',
        'text-mid': '#6b5a4a',
        'text-dim': '#c0a888',
      },
    },
  },
  plugins: [],
}