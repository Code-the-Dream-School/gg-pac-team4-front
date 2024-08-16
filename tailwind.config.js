/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        black: '#262626',
        pureWhite: '#FFFFFF',
        white: '#F5FFFF',
        grey: '#CCCCCC',
        red: '#F95C7B',
        lightGreen: '#8ADADD',
        darkGreen: '#10BEB8',
        yellow: '#F9B146',
        lightBlue: '#F0FFFF',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
