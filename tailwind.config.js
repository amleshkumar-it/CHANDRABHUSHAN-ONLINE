/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#101B35',
        navyLight: '#1E3A5F',
        tealBrand: '#0F766E',
        tealDark: '#0A5C55',
        tealSoft: '#E6F4F1',
        tealLight: '#2DD4BF',
        linkNavy: '#14365E',
        paper: '#ffffff',
        pagebg: '#F3F5F8',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
