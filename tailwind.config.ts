import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        outline: "var(--outline)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        primaryBtn: "var(--primary-btn)",
        primaryHoverBtn: "var(--primary-hover-btn)",
        secondaryBtn: "var(--secondary-btn)",
        secondaryHoverBtn: "var(--secondary-hover-btn)",
        sidebarHoverBtn: "var(--sidebar-hover-btn)",
        sidebarActiveBtn: "var(--sidebar-active-btn)",
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
  darkMode: "class", // importante para poder alternar tema con .dark
};

export default config;
