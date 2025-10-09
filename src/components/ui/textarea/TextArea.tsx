import React from "react";
import "./textarea.scss";

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = "",
  ...props
}) => {
  return <textarea className={`textarea ${className}`} {...props} />;
};
