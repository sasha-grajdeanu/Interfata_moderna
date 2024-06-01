/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ['"Josefin Sans"', 'sans-serif'],
        majorMono: ['"Major Mono Display"', 'monospace'],
        robotoMono: ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

