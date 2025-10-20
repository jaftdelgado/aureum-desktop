export const colors = {
  bg: "#101010",
  separator: "#2d2d2d",

  primaryText: "#ededed",
  secondaryText: "#a1a1a1",

  primaryBtn: "#ededed",
  primaryHoverBtn: "#cccccc",
  secondaryBtn: "#262626",
  secondaryHoverBtn: "#4a4a4a",
  sidebarHoverBtn: "#242424",
  sidebarActiveBtn: "#323232",
} as const;

export type ColorKeys = keyof typeof colors;
