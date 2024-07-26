/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#262626",
        white: "#F5FFFF",
        red: "#F95C7B",
        lightGreen: "#8ADADD",
        darkGreen: "#10BEB8",
        yellow: "#F9B146",
        lightBlue: "#F0FFFF",
      },
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
});