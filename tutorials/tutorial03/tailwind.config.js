/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*html"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#00baff",
        "custom-purple": "#6336fa",
      },
    },
    fontFamily: {
      Poppins: ["Poppins"],
    },
  },
  plugins: [],
};
