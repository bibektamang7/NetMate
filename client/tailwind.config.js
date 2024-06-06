/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    colors: {
      darkBgColor: "#1A1A1A",
      darkFontColor: "#ECECEC",
      darkCardBgColor: "#282828",
    },
    extend: {},
  },
  plugins: [],
}

