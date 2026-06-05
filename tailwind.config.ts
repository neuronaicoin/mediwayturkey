import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a2540",
          light: "#0c2d4d",
          soft: "#143a5e",
          muted: "#9fb3c8",
        },
        gold: {
          DEFAULT: "#fbbf24",
          deep: "#d4960a",
          dark: "#b8860b",
          tint: "#fdf3e0",
        },
        cream: "#faf8f5",
        sky: "#e8f0f7",
        slate: {
          body: "#334155",
        },
        emerald: {
          trust: "#10b981",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
