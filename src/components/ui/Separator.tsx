import React from "react";

interface SeparatorProps {
  variant?: "line" | "text";
  text?: string;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  variant = "line",
  text,
  className = "",
}) => {
  if (variant === "line") {
    return <hr className={`border-t border-separator my-4 ${className}`} />;
  }

  if (variant === "text") {
    return (
      <div className={`flex items-center my-4 ${className}`}>
        <div className="flex-grow border-t border-separator" />
        <span className="px-2 text-small text-secondaryText whitespace-nowrap">
          {text}
        </span>
        <div className="flex-grow border-t border-separator" />
      </div>
    );
  }

  return null;
};
