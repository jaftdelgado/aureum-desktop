import React from "react";
import "@styles/theme.css";

interface SeparatorProps {
  variant?: "line" | "text" | "vertical";
  text?: string;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  variant = "line",
  text,
  className = "",
}) => {
  const borderColorClass = "border-outline";

  if (variant === "line") {
    return <hr className={`border-t ${borderColorClass} my-4 ${className}`} />;
  }

  if (variant === "text") {
    return (
      <div className={`flex items-center my-4 ${className}`}>
        <div className={`flex-grow border-t ${borderColorClass}`} />
        <span className="px-2 text-small text-secondaryText whitespace-nowrap">
          {text}
        </span>
        <div className={`flex-grow border-t ${borderColorClass}`} />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div
        className={`h-6 border-l ${borderColorClass} mx-2`}
        aria-hidden="true"
      />
    );
  }

  return null;
};
