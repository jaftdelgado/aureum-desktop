import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        outline: "var(--outline)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        destructive: "var(--destructive)",
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
        small: "0.82rem",
      },
      lineHeight: {
        h1: "1.1",
        body: "1.2",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
