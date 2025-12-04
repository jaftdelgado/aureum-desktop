/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        outline: "var(--outline)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        card: "var(--card)",
        primaryBtn: "var(--primary-btn)",
        primaryHoverBtn: "var(--primary-hover-btn)",
        secondaryBtn: "var(--secondary-btn)",
        secondaryHoverBtn: "var(--secondary-hover-btn)",
      },
      fontFamily: {
        geist: ['"Geist"', 'sans-serif'],
      },
      fontSize: {
        h1: "var(--font-h1)",
        subtitle: "var(--font-subtitle)",
        headline: "var(--font-headline)",
        body: "var(--font-body)",
        small: "var(--font-small)",
      },
      lineHeight: {
        h1: "var(--line-h1)",
        body: "var(--line-body)",
      },
      spacing: {
        "page-x": "var(--page-padding-x)",
        "page-y": "var(--page-padding-y)",
      },
    },
  },
  plugins: [],
};
