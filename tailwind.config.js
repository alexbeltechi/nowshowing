/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Epilogue"', 'Helvetica Neue', 'sans-serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        museum: {
          bg: '#fafaf8',
          text: '#1a1a1a',
          muted: '#8a8a82',
          border: '#e8e8e4',
          accent: '#2a2a2a',
        }
      },
      maxWidth: {
        'article': '42rem',
        'gallery': '64rem',
      }
    },
  },
  plugins: [],
}
