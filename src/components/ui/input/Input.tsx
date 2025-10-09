import React from "react";
import "./input.scss";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  type,
  ...props
}) => {
  return <input type={type} className={`input ${className}`} {...props} />;
};
