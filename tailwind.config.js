/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'text-body',
    'text-small',
    'text-caption'
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        outline: "var(--outline)",
        secondaryOutline: "var(--secondary-outline)",
        alphaOutline: "var(--alpha-outline)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        destructiveBg: "var(--destructive-bg)",
        destructive: "var(--destructive)",
        successBg: "var(--success-bg)",
        success: "var(--success)",
        sidebarBg: "var(--sidebar-bg)",
        card: "var(--card)",
        transparentHover: "var(--transparent-hover)",
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
        caption: "var(--font-small)"
      },
      lineHeight: {
        h1: "var(--line-h1)",
        body: "var(--line-body)",
      },
      spacing: {
        "page-x": "var(--page-padding-x)",
        "page-y": "var(--page-padding-y)",
        "section-x": "var(--sections-padding-x)",
        "section-y": "var(--sections-padding-y)",
        "component-x": "var(--component-padding-x)",
        "component-y": "var(--component-padding-y)",
      },
    },
  },
  plugins: [],
};
