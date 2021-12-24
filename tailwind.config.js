module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'carousel 4s ease infinite',
      },
      keyframes: {
        'carousel': {
          '0%': { 'background-position': "0% 50%" },
          '50%': { 'background-position': "50% 100%" },
          '100%': { 'background-position': "0% 50%" },
        }
      }
    },
  },
  plugins: [],
}
