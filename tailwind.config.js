/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      dullWhite: "#f5f5f5",
      background: "#1F1D36",
      warningRed: "#D0342C",
      blackShade: "#121212",
      primaryBlue: "#0000FF",

      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",

      bermuda: "#78dcca",
      "progress-bar-track": "#454545",
      "progress-bar-progress": "green",
      "progress-bar-indicator": "#fff",
      "progress-bar-indicator-border": "#454545",
    },

    extend: {},
  },
  plugins: [],
};
