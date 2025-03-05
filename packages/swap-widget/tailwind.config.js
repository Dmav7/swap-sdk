/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#46A1C2',
        'primary-800': 'rgba(70, 161, 194, 0.8)',
        'primary-500': 'rgba(70, 161, 194, 0.5)',
        'primary-20': '#D1E4E8',
        primaryLight: '#F0F8F9',
        light: '#F4F5F1',
        darkGray: '#60605F',
        green: '#5ECAA0',
        red: '#ED7685',
        primaryBlack: '#16182B',
        beige: '#E2E0DB',
      },
    },
  },
  plugins: [],
}
