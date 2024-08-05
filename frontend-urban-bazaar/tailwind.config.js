/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#F0F9FF',
        contactBlue: '#DAEFFA',
        submitBlue: '#7DC8EF'
      },
    },
  },
  plugins: [],
};
