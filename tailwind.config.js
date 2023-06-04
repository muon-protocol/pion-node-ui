/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#5158F6',
        'dark-soft-primary': '#5158f640',
        'xyz-75': '#E9EFF6BF',
        'soft-sky': '#BCC8DE',
        'plan-1': '#F58E8E80',
        'plan-2': '#F3C95D80',
        'plan-3': '#918EF580',
      },
    },
  },
  plugins: [],
};
