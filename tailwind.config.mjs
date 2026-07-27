/** @type {import('tailwindcss').Config} */
const themeColor = (name) =>
  `rgb(var(--portfolio-color-${name}) / <alpha-value>)`;
const solidThemeColor = (name) =>
  `rgb(var(--portfolio-color-${name}) / 1)`;

const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          '0%': { color: solidThemeColor("accent-soft")}, 
          '50%': { color: solidThemeColor("accent-deep") }, 
          '100%': { color: solidThemeColor("accent-soft") }, 
        },
      },
      animation: {
        colorChange: 'colorChange 1s infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "site-accent": themeColor("accent"),
        "site-accent-deep": themeColor("accent-deep"),
        "site-accent-soft": themeColor("accent-soft"),
        "site-bg": themeColor("background"),
        "site-border": themeColor("border"),
        "site-border-subtle": themeColor("border-subtle"),
        "site-hover": themeColor("hover"),
        "site-image-bg": themeColor("image-background"),
        "site-inverse": themeColor("inverse"),
        "site-muted": themeColor("muted"),
        "site-muted-strong": themeColor("muted-strong"),
        "site-surface": themeColor("surface"),
        "site-surface-strong": themeColor("surface-strong"),
        "site-text": themeColor("text"),
        "site-text-soft": themeColor("text-soft"),
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
