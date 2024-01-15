/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        mdx: 'var(--mdx)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
