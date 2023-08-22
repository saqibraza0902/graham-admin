/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand_black: {
          500: "#0A1629",
        },
        brand_white: {
          300: "#F5F6FA",
          400: "#E4E6E8",
          500: "#F6F7FB",
          600: "#E1E1E1",
        },
        brand_green: {
          100: "#D0E7DC",
          400: "#38E25D",
          500: "#3DD598",
          800: "#369768",
        },
        brand_grey: {
          200: "#92929D",
          300: "#979797",
          400: "#7D8592",
          500: "#91929E",
        },
        brand_yellow: {
          500: "#FFC10E",
        },
        brand_purple: {
          500: "#A228B6",
        },
        brand_red: {
          300: "#FF0000",
          500: "#EB2424",
        },
      },
      fontFamily: {
        sans: ["Montserrat"],
        Montserrat: ["Montserrat"],
        Roboto: ["Roboto"],
        Poppins: ["Poppins"],
        Nunito: ["Nunito Sans"],
      },
    },
  },
  plugins: [],
};
