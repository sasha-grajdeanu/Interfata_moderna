/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ['"Josefin Sans"', "sans-serif"],
        majorMono: ['"Major Mono Display"', "monospace"],
        robotoMono: ['"Roboto Mono"', "monospace"],
        urbanist: ['"Urbanist"', "monospace"],
      },
      colors: {
        Retrosphere: {
          100: "#190028",
          200: "#4A003C",
          300: "#EB005E",
          400: "#FF6FDD",
          500: "#FDCEFD",
        },
        Space: {
          100: "#042959",
          200: "#0A4DA6",
          300: "#2c7ce6",
          400: "#79C4F2",
          500: "#c7e3f0",
        },
      },
    },
  },
  plugins: [],
};
