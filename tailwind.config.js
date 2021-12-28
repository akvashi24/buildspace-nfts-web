module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundSize: {
        '4x': "400%",
      },
      animation: {
        'gradient': 'carousel 7s ease infinite',
      },
      keyframes: {
        'carousel': {
          '0%': { 'background-position': "0% 50%" },
          '50%': { 'background-position': "100% 50%" },
          '100%': { 'background-position': "0% 50%" },
        }
      }
    },
  },
  plugins: [],
}
