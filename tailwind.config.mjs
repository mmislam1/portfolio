/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          '0%': { color: '#fcd34d'}, 
          //'25%': { color: '#facc15' }, 
          '50%': { color: '#ca8a04' }, 
          //'75%': { color: '#facc15' },
          '100%': { color: '#fcd34d' }, 
        },
      },
      animation: {
        colorChange: 'colorChange 1s infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
