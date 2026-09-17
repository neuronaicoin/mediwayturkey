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
          DEFAULT: "#0b1c2c",
          light: "#0c2d4d",
          soft: "#143a5e",
          muted: "#9fb3c8",
        },
        gold: {
          DEFAULT: "#c9a84c",
          deep: "#ad8a34",
          dark: "#8a6f28",
          tint: "#f6efdc",
        },
        cream: "#f8f6f2",
        sky: "#e8f0f7",
        slate: {
          body: "#334155",
          soft: "#5a6a7a",
        },
        emerald: {
          trust: "#10b981",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
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
