/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['"League Spartan"', "sans-serif"],
      },
      colors: {
        primary: "#0C448F",
        success: "#47B756",
        background: "#F4F8FF",
      },
    },
  },
  plugins: [],
};
