import React from "react";
import { Button } from "@core/ui/Button";
import { useAppTheme } from "@app/hooks/useAppTheme";

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <Button
      variant="icon"
      onClick={toggleTheme}
      iconOnly={theme === "light" ? "hugeicons:moon-02" : "hugeicons:sun-03"}
      size="md"
    />
  );
};
