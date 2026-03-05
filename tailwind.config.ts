import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { heroui } from "@heroui/react";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "background-muted": "var(--background-muted)",
        "foreground-muted": "var(--foreground-muted)",
        primary: "var(--primary)",
        "primary-muted": "var(--primary-muted)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-gilda)", "serif"],
      },
    },
  },
  plugins: [
    // wrap HeroUI plugin so TS sees a v3-compatible plugin
    plugin(heroui().handler),
  ],
};

export default config;
