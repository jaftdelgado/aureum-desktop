import React, { useState, useEffect } from "react";
import { Button } from "@core/base-design/Button";
export const ThemeToggleButton: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Button
      variant="icon"
      onClick={toggleTheme}
      iconOnly={theme === "light" ? "hugeicons:moon-02" : "hugeicons:sun-03"}
      size="md"
    />
  );
};
