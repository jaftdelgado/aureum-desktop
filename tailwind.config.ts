import type { Config } from "tailwindcss";
import { colors } from "./src/styles/theme";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        separator: colors.separator,
        primaryText: colors.primaryText,
        secondaryText: colors.secondaryText,
        primaryBtn: colors.primaryBtn,
        primaryHoverBtn: colors.primaryHoverBtn,
        secondaryBtn: colors.secondaryBtn,
        secondaryHoverBtn: colors.secondaryHoverBtn,
        sidebarHoverBtn: colors.sidebarHoverBtn,
        sidebarActiveBtn: colors.sidebarActiveBtn,
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      fontSize: {
        h1: "1.75rem",
        subtitle: "1.25rem",
        body: "0.9rem",
        small: "0.8rem",
      },
      lineHeight: {
        h1: "1.1",
        body: "1.2",
      },
    },
  },
  plugins: [],
};

export default config;
