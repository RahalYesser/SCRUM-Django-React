/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {     
      colors: {
        "white": "#ffffff",
        "purple": "#CC85C6",
        "yellow": "#FDD446",
        "theme-color": "#F94F4F",
        "border-color": "#E8E8E8",
        "body-color": "#747E88",
        "heading-color": "#162447",
        "shadow": "#9D6A6A",
      },
    },
  },
  plugins: [],
}

