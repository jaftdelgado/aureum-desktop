import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        outline: "var(--outline)",
        thirdy: "var(--thirdy)",
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
        h1: "var(--font-h1)",
        subtitle: "var(--font-subtitle)",
        body: "var(--font-body)",
        small: "var(--font-small)",
      },
      lineHeight: {
        h1: "var(--line-h1)",
        body: "var(--line-body)",
      },
      spacing: {
        "8.5": "2.125rem",
        "page-x": "var(--page-padding-x)",
        "page-y": "var(--page-padding-y)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
