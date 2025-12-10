// src/core/components/Container.tsx
import React from "react";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-bg rounded-[20px] border shadow-sm border-outline inline-block ${className}`}
    >
      {children}
    </div>
  );
};
