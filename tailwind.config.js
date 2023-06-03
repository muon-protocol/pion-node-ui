/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#5158F6',
        'dark-soft-primary': '#5158f640',
        'xyz-75': '#e9eff6bf',
      },
    },
  },
  plugins: [],
};
