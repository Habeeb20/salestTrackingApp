/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grokDark: '#1C2526', // Grok-inspired dark gray
       skyBlue: '#87BCFF', // Sky blue
        navyBlue: '#000080', // Navy blue
      },


    },
  },
  plugins: [],
};

