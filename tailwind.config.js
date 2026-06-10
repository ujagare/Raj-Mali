/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172234',
        navy: '#26364a',
        steel: '#6f7a86',
        pearl: '#f4f7f9',
        mist: '#e7edf2',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 18px 50px rgba(31, 45, 61, 0.12)',
        soft: '0 10px 30px rgba(31, 45, 61, 0.08)',
      },
      letterSpacing: {
        luxury: '0.18em',
      },
    },
  },
  plugins: [],
};
