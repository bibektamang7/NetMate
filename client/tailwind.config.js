/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Use 'class' if you want to toggle dark mode using a CSS class
  theme: {
    extend: {
      colors: {
        darkBgColor: "#1A1A1A",
        darkFontColor: "#ECECEC",
        darkCardBgColor: "#282828",
        ...defaultTheme.colors, // This includes the default colors like bg-white, text-white, etc.
      },
    },
  },
  plugins: [],
}
