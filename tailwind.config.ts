import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171337",
        brand: {
          DEFAULT: "#372C86",
          dark: "#241B5E",
          light: "#4F42B0",
        },
        gold: {
          DEFAULT: "#C89B3C",
          light: "#E4C578",
        },
        cream: "#F7F5EF",
        muted: "#6B6785",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
