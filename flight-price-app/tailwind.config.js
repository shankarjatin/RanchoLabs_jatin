module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}', // Tell Tailwind to remove unused styles in production
  ],
  theme: {
    extend: {
      colors: {
        purple: '#6B4D9A',
        darkPurple: '#4B2D65',
      },
    },
  },
  plugins: [],
}
