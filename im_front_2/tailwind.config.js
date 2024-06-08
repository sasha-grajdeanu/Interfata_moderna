/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ['"Josefin Sans"', "sans-serif"],
        majorMono: ['"Major Mono Display"', "monospace"],
        robotoMono: ['"Roboto Mono"', "monospace"],
        urbanist: ['"Urbanist"', "monospace"],
      },
      colors: {
        night: {
          100: "#070066",
          200: "#710af0",
          300: "#ab66ff",
          400: "#c8e8fe",
          500: "#ffffff",
        },
        RedWine: {
          100: "#1e0f19",
          200: "#4a1a3f",
          300: "#7c2169",
          400: "#cb6db4",
          500: "#f6e2f0",
        },
        Retrosphere: {
          100: "#190028",
          200: "#4A003C",
          300: "#EB005E",
          400: "#FF6FDD",
          500: "#FDCEFD",
        },
      },
    },
  },
  plugins: [],
};
